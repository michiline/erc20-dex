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
    this.onClickExample1 = this.onClickExample1.bind(this)
    this.onClickExample2 = this.onClickExample2.bind(this)
  }
  render () {
    return (
      <div>
        <div>
          <h3>Buy</h3>
          <p><strong>Available: </strong>{`${this.props.parent.state.balanceA} ${this.props.parent.state.symbolA}`}</p>
          <strong>Price:&nbsp;</strong><input type='number' value={this.state.buyRate} onChange={e => this.inputBuyRate(e)} />
          <br />
          <strong>Amount:&nbsp;</strong><input type='number' value={this.state.buyAmount} onChange={e => this.inputBuyAmount(e)} />
          <br />
          <input type='button' value='Buy' onClick={this.onClickBuy} />
        </div>
        <div>
          <h3>Sell</h3>
          <p><strong>Available: </strong>{`${this.props.parent.state.balanceB} ${this.props.parent.state.symbolB}`}</p>
          <strong>Price:&nbsp;</strong><input type='number' value={this.state.sellRate} onChange={e => this.inputSellRate(e)} />
          <br />
          <strong>Amount:&nbsp;</strong><input type='number' value={this.state.sellAmount} onChange={e => this.inputSellAmount(e)} />
          <br />
          <input type='button' value='Sell' onClick={this.onClickSell} />
        </div>
        <input type='button' value='Example1' onClick={this.onClickExample1} />
        <input type='button' value='Example2' onClick={this.onClickExample2} />
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
  onClickExample1 () {
    this.props.parent.func.example1()
  }
  onClickExample2 () {
    this.props.parent.func.example2()
  }
}

ExchangeBuySell.propTypes = {
  parent: PropTypes.object.isRequired
}
