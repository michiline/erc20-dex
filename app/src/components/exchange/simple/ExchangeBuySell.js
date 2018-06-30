import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExchangeBuySell extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyRate: 0,
      buyAmount: 0,
      sellRate: 0,
      sellAmount: 0
    }
    this.onClickBuy = this.onClickBuy.bind(this)
    this.onClickSell = this.onClickSell.bind(this)
  }
  render () {
    return (
      <div className='row padding border-top rounded-top'>
        <div className='col-lg'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6'>
                <h3>Buy</h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <form>
                  <div className='form-group'>
                    <p><strong>Available: </strong>{`${this.props.parent.state.balanceA} ${this.props.parent.state.symbolA}`}</p>
                    <label>Price</label>
                    <input value={this.state.buyRate} onChange={e => this.inputBuyRate(e)} type='number' className='form-control' placeholder='Enter price' />
                  </div>
                  <div className='form-group'>
                    <label>Amount</label>
                    <input value={this.state.buyAmount} onChange={e => this.inputBuyAmount(e)} type='number' className='form-control' placeholder='Enter amount' />
                  </div>
                  <button onClick={this.onClickBuy} type='submit' className='btn btn-secondary float-right'>Buy</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg'>
                <h3>Sell</h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <form>
                  <div className='form-group'>
                    <p><strong>Available: </strong>{`${this.props.parent.state.balanceB} ${this.props.parent.state.symbolB}`}</p>
                    <label>Price</label>
                    <input value={this.state.sellRate} onChange={e => this.inputSellRate(e)} type='number' className='form-control' placeholder='Enter price' />
                  </div>
                  <div className='form-group'>
                    <label>Amount</label>
                    <input value={this.state.sellAmount} onChange={e => this.inputSellAmount(e)} type='number' className='form-control' placeholder='Enter amount' />
                  </div>
                  <button onClick={this.onClickSell} type='submit' className='btn btn-secondary float-right'>Sell</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // componentDidMount () {
  //   this.props.parent.func.getTokensInfo()
  // }
  inputBuyRate (e) {
    this.setState({
      buyRate: e.target.value
    })
  }
  inputBuyAmount (e) {
    this.setState({
      buyAmount: e.target.value
    })
  }
  inputSellRate (e) {
    this.setState({
      sellRate: e.target.value
    })
  }
  inputSellAmount (e) {
    this.setState({
      sellAmount: e.target.value
    })
  }
  onClickBuy (e) {
    e.preventDefault()
    try {
      this.props.parent.func.buyOrder({
        rate: this.state.buyRate,
        amount: this.state.buyAmount
      })
    } catch (err) {
      this.setState({
        buyRate: 0,
        buyAmount: 0
      })
      console.log(err)
    }
  }
  onClickSell (e) {
    e.preventDefault()
    try {
      this.props.parent.func.sellOrder({
        rate: this.state.sellRate,
        amount: this.state.sellAmount
      })
    } catch (err) {
      this.setState({
        sellRate: 0,
        sellAmount: 0
      })
      console.log(err)
    }
  }
}

ExchangeBuySell.propTypes = {
  parent: PropTypes.object.isRequired
}
