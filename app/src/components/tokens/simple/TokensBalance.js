import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TokensBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tokenContracts: [],
      renderData: {},
      mintSymbol: '',
      mintAmount: ''
    }
    this.getTokens = this.getTokens.bind(this)
    this.mintTokens = this.mintTokens.bind(this)
    this.mintSymbol = this.mintSymbol.bind(this)
    this.mintAmount = this.mintAmount.bind(this)
  }
  render () {
    return Object.keys(this.state.renderData).length === 0 ? 'Loading ...' : this.state.renderData
  }

  async componentDidMount () {
    this.getTokens()
  }

  async getTokens () {
    try {
      const tokenContracts = await this.props.parent.func.getTokens()
      const accounts = await this.props.parent.state.web3.eth.getAccounts()
      const address = accounts[0]
      const headers = (
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Balance</th>
            <th>sum Supply</th>
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
        const showInput = this.state.mintSymbol === symbol
        const tr = (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{symbol}</td>
            <td>{balance} </td>
            <td>{supply} </td>
            {showInput && <td><input type='number' onChange={e => this.mintAmount(e)} placeholder='enter number of tokens' /></td>}
            {showInput && <td><button onClick={e => this.mintTokens(contract._address)}>Mint</button></td>}
            {isOwner && !showInput && <td><button onClick={e => this.mintSymbol(symbol)}>Mint</button></td>}
          </tr>
        )
        return tr
      }))
      const renderData = (
        <table>
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
      const accounts = await this.props.parent.state.web3.eth.getAccounts()
      const to = accounts[0]
      const tokenContract = this.state.tokenContracts.find(token => token._address === tokenAdress)
      await tokenContract.methods.mint(to, this.state.mintAmount).send({ from: to })
    } catch (err) {
      this.setState({
        mintSymbol: '',
        mintAmount: ''
      })
      console.log(err)
    }
  }

  async mintAmount (e) {
    e.preventDefault()
    this.setState({
      mintAmount: e.target.value
    })
  }

  async mintSymbol (mintSymbol) {
    await this.setState({
      mintSymbol: mintSymbol
    })
    this.getTokens()
  }
}

TokensBalance.propTypes = {
  parent: PropTypes.object.isRequired
}
