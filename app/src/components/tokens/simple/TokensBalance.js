import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getWeb3js from '../../../utils/getWeb3js'

export default class TokensBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tokenContracts: [],
      renderData: {},
      mintSymbol: '',
      mintAmount: '',
      burnSymbol: '',
      burnAmount: ''
    }
    this.getTokens = this.getTokens.bind(this)
    this.mintTokens = this.mintTokens.bind(this)
    this.mintSymbol = this.mintSymbol.bind(this)
    this.mintAmount = this.mintAmount.bind(this)
    this.burnTokens = this.burnTokens.bind(this)
    this.burnSymbol = this.burnSymbol.bind(this)
    this.burnAmount = this.burnAmount.bind(this)
  }
  render () {
    return Object.keys(this.state.renderData).length === 0 ? 'Loading ...' : this.state.renderData
  }

  async componentDidMount () {
    this.getTokens()
  }

  async getTokens () {
    try {
      const results = await getWeb3js
      const web3 = results.web3
      const tokenContracts = await this.props.parent.func.getTokens()
      const accounts = await web3.eth.getAccounts()
      const address = accounts[0]
      const headers = (
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Balance</th>
            <th>Supply</th>
            <th />
            <th />
          </tr>
        </thead>
      )
      const body = await Promise.all(tokenContracts.map(async (contract, index) => {
        const name = await contract.methods.name().call()
        const symbol = await contract.methods.symbol().call()
        const supply = await contract.methods.totalSupply().call()
        const owner = await contract.methods.owner().call()
        const balance = await contract.methods.balanceOf(address).call()
        const isOwner = address === owner
        const showMintInput = this.state.mintSymbol === symbol
        const showBurnInput = this.state.burnSymbol === symbol
        const tr = (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{symbol}</td>
            <td>{balance} </td>
            <td>{supply} </td>
            {showMintInput && <td><button onClick={e => this.mintTokens(contract._address)} type='submit' className='btn btn-secondary'>Mint</button></td>}
            {isOwner && !showMintInput && <td><button onClick={e => this.mintSymbol(symbol)} type='submit' className='btn btn-secondary'>Mint</button></td>}
            {showMintInput && <td><input type='number' onChange={e => this.mintAmount(e)} className='form-control input-small' min='1' /></td>}
            {showBurnInput && <td><button onClick={e => this.burnTokens(contract._address)} type='submit' className='btn btn-secondary'>Burn</button></td>}
            {!showBurnInput && <td><button onClick={e => this.burnSymbol(symbol)} type='submit' className='btn btn-secondary'>Burn</button></td>}
            {showBurnInput && <td><input type='number' onChange={e => this.burnAmount(e)} className='form-control input-small' min='1' /></td>}
          </tr>
        )
        return tr
      }))
      const renderData = (
        <table className='table'>
          {headers}
          <tbody>
            {body}
          </tbody>
        </table>
      )
      this.setState({
        tokenContracts: tokenContracts,
        renderData: renderData
      })
    } catch (err) {
      console.log(err)
    }
  }

  async mintTokens (tokenAdress) {
    try {
      const results = await getWeb3js
      const web3 = results.web3
      const accounts = await web3.eth.getAccounts()
      const sender = accounts[0]
      const tokenContract = this.state.tokenContracts.find(token => token._address === tokenAdress)
      await tokenContract.methods.mint(sender, this.state.mintAmount).send({ from: sender })
    } catch (err) {
      console.log(err)
    }
    await this.setState({
      mintSymbol: '',
      mintAmount: '',
      burnSymbol: '',
      burnAmount: ''
    })
    this.getTokens()
  }
  async burnTokens (tokenAdress) {
    try {
      const results = await getWeb3js
      const web3 = results.web3
      const accounts = await web3.eth.getAccounts()
      const from = accounts[0]
      const tokenContract = this.state.tokenContracts.find(token => token._address === tokenAdress)
      await tokenContract.methods.burn(this.state.burnAmount).send({ from: from })
    } catch (err) {
      console.log(err)
    }
    this.setState({
      burnSymbol: '',
      burnAmount: '',
      mintSymbol: '',
      mintAmount: ''
    })
    this.getTokens()
  }

  async mintAmount (e) {
    e.preventDefault()
    this.setState({
      mintAmount: e.target.value
    })
  }

  async burnAmount (e) {
    e.preventDefault()
    this.setState({
      burnAmount: e.target.value
    })
  }

  async mintSymbol (mintSymbol) {
    await this.setState({
      mintSymbol: mintSymbol
    })
    this.getTokens()
  }

  async burnSymbol (burnSymbol) {
    await this.setState({
      burnSymbol: burnSymbol
    })
    this.getTokens()
  }
}

TokensBalance.propTypes = {
  parent: PropTypes.object.isRequired
}
