import fs from 'fs'
import path from 'path'
import solc from 'solc'
import Web3 from 'web3'

import swapRepo from '../../swap/repos/swap-repo'

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))

export default {
  async create (req, res, next) {
    try {
      const erc20InterfaceFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'ERC20Interface.sol'), 'utf8')
      const erc20SwapFile = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'ERC20Swap.sol'), 'utf8')
      const solcOutput = solc.compile({
        sources: {
          'ERC20Interface.sol': erc20InterfaceFile,
          'ERC20Swap.sol': erc20SwapFile
        }
      }, 1)
      // address deploying the swap contract
      // const swapFromAddress = '0x336d6e44757046C3d01d47cb31a3a9A1770FFe13'
      const swapFromAddress = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
      // swap contract account
      const swapAccount = web3.eth.accounts.create()
      const swapOutput = solcOutput.contracts['ERC20Swap.sol:ERC20Swap']
      const swapAbi = swapOutput.interface
      const swapBytecode = swapOutput.bytecode
      const swapGasEstimate = await web3.eth.estimateGas({data: swapBytecode})
      const swapOptions = {
        from: swapFromAddress,
        data: swapBytecode,
        gas: swapGasEstimate
      }
      const swapContract = new web3.eth.Contract(JSON.parse(swapAbi), swapAccount.address, swapOptions)
      const swapContractDeploy = await swapContract.deploy()
      const swap = await swapContractDeploy.send({
        from: swapFromAddress,
        gas: swapGasEstimate * 2,
        gasPrice: '30000000000'
      })
      const swapData = swapRepo.prepareSwapData(swap)
      swapRepo.create(swapData)
      req.swap = swapData
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async get (req, res, next) {
    try {
      req.swap = await swapRepo.get()
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}
