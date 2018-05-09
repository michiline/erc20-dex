import React from 'react'
import PropTypes from 'prop-types'

export default class TokensCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      symbol: '',
      supply: ''
    }
    this.body = this.body.bind(this)
    this.inputName = this.inputName.bind(this)
    this.inputSymbol = this.inputSymbol.bind(this)
    this.inputSupply = this.inputSupply.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  render () {
    return this.body()
  }
  body () {
    return (
      <div>
        <input type='text' value={this.state.name} onChange={e => this.inputName(e)} placeholder='enter token name' />
        <br />
        <input type='text' value={this.state.symbol} onChange={e => this.inputSymbol(e)} placeholder='enter token symbol' />
        <br />
        <input type='number' value={this.state.supply} onChange={e => this.inputSupply(e)} placeholder='enter token supply' />
        <br />
        <input type='button' value='Create token' onClick={this.onClick} />
      </div>
    )
  }
  inputName (e) {
    this.setState({
      name: e.target.value
    })
  }

  inputSymbol (e) {
    this.setState({
      symbol: e.target.value
    })
  }

  inputSupply (e) {
    this.setState({
      supply: e.target.value
    })
  }
  onClick (e) {
    e.preventDefault()
    try {
      this.props.parent.func.createToken({
        name: this.state.name,
        symbol: this.state.symbol,
        supply: this.state.supply
      })
    } catch (err) {
      this.setState({
        name: '',
        symbol: '',
        supply: ''
      })
      console.log(err)
    }
  }
}

TokensCreate.propTypes = {
  parent: PropTypes.object.isRequired
}
