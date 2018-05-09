import fs from 'fs'
import path from 'path'
import solc from 'solc'
import Web3 from 'web3'

import tokenRepo from '../../tokens/repos/token-repo'

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))

export default {
  async create (req, res, next) {
    try {
      const erc20InterfaceFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'ERC20Interface.sol'), 'utf8')
      const erc20TokenFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'ERC20Token.sol'), 'utf8')
      const mintableTokenFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'MintableToken.sol'), 'utf8')
      const burnableTokenFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'BurnableToken.sol'), 'utf8')
      const ownableFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Ownable.sol'), 'utf8')
      const tokenFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Token.sol'), 'utf8')
      const solcOutput = solc.compile({
        sources: {
          'ERC20Interface.sol': erc20InterfaceFile,
          'ERC20Token.sol': erc20TokenFile,
          'MintableToken.sol': mintableTokenFile,
          'BurnableToken.sol': burnableTokenFile,
          'Ownable.sol': ownableFile,
          'Token.sol': tokenFile
        }
      }, 1)
      const tokenAccount = web3.eth.accounts.create()
      const tokenOutput = solcOutput.contracts['Token.sol:Token']
      const tokenAbi = tokenOutput.interface
      const tokenBytecode = tokenOutput.bytecode
      const tokenGasEstimate = await web3.eth.estimateGas({data: tokenBytecode})
      const tokenOptions = {
        from: req.body.from,
        data: tokenBytecode,
        gas: tokenGasEstimate
      }
      const tokenContract = new web3.eth.Contract(JSON.parse(tokenAbi), tokenAccount.address, tokenOptions)
      const tokenContractDeploy = await tokenContract.deploy({ arguments: [req.body.name, req.body.symbol, parseInt(req.body.supply)] })
      const token = await tokenContractDeploy.send({
        from: req.body.sender,
        gas: tokenGasEstimate * 2,
        gasPrice: '30000000000'
      })
      tokenRepo.create(token)
      req.token = token
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async get (req, res, next) {
    try {
      req.tokens = await tokenRepo.getAll()
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async mint (req, res, next) {
    try {
      const token = req.user.tokens.find(token => {
        return token.symbol === req.body.symbol
      })
      const tokenContract = new web3.eth.Contract(JSON.parse(token.jsonInterface), token.address)
      await tokenContract.methods.mint(req.body.from, req.body.amount)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}
