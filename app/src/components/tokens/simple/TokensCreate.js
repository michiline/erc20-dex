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
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 dark-grey padding'>
            <form>
              <div className='form-group'>
                <label>Name</label>
                <input value={this.state.name} onChange={e => this.inputName(e)} type='text' className='form-control' placeholder='Enter token name' />
              </div>
              <div className='form-group'>
                <label>Symbol</label>
                <input value={this.state.symbol} onChange={e => this.inputSymbol(e)} type='text' className='form-control' placeholder='Enter token symbol' />
              </div>
              <div className='form-group'>
                <label>Supply</label>
                <input value={this.state.supply} onChange={e => this.inputSupply(e)} type='number' className='form-control' placeholder='Enter token supply' />
              </div>
              <button onClick={this.onClick} type='submit' className='btn btn-secondary'>Create token</button>
            </form>
          </div>
        </div>
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
