import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExchangeOrders extends Component {
  constructor (props) {
    super(props)
    this.expire = this.expire.bind(this)
  }
  render () {
    if (this.props.parent.state.buyOpenOrders.length === 0 && this.props.parent.state.sellOpenOrders.length === 0) {
      return (
        <div>
          <h3>Open Orders</h3>
        </div>
      )
    }
    return (
      <div>
        <h3>Open Orders</h3>
        {this.buy()}
        {this.sell()}
      </div>
    )
  }
  componentDidMount () {
    this.props.parent.func.getOpenOrders()
  }

  buy () {
    try {
      const headers = (
        <thead>
          <tr>
            <th>Price</th>
            <th>{this.props.parent.state.symbolB}</th>
            <th>{this.props.parent.state.symbolA}</th>
          </tr>
        </thead>
      )
      const body = this.props.parent.state.buyOpenOrders.map((order, index) => {
        const tr = (
          <tr key={index}>
            <td>{parseInt(order.remainingAmountA, 10) / parseInt(order.remainingAmountB, 10)}</td>
            <td>{order.remainingAmountB}</td>
            <td>{order.remainingAmountA}</td>
            <td><input type='button' value='Cancel' onClick={e => this.expire(order.swapID)} /></td>
          </tr>
        )
        return tr
      })
      const renderData = (
        <div>
          <p><strong>Buy orders</strong></p>
          <table className='green'>
            {headers}
            <tbody>
              {body}
            </tbody>
          </table>
        </div>

      )
      return renderData
    } catch (err) {
      console.log(err)
    }
  }
  sell () {
    try {
      const headers = (
        <thead>
          <tr>
            <th>Price</th>
            <th>{this.props.parent.state.symbolB}</th>
            <th>{this.props.parent.state.symbolA}</th>
          </tr>
        </thead>
      )
      const body = this.props.parent.state.sellOpenOrders.map((order, index) => {
        const tr = (
          <tr key={index}>
            <td>{parseInt(order.remainingAmountB, 10) / parseInt(order.remainingAmountA, 10)}</td>
            <td>{order.remainingAmountA}</td>
            <td>{order.remainingAmountB}</td>
            <td><input type='button' value='Cancel' onClick={e => this.expire(order.swapID)} /></td>
          </tr>
        )
        return tr
      })
      const renderData = (
        <div>
          <p><strong>Sell orders</strong></p>
          <table className='red'>
            {headers}
            <tbody>
              {body}
            </tbody>
          </table>
        </div>
      )
      return renderData
    } catch (err) {
      console.log(err)
    }
  }
  expire (swapID) {
    try {
      this.props.parent.func.expire(swapID)
    } catch (err) {
      console.log(err)
    }
  }
}

ExchangeOrders.propTypes = {
  parent: PropTypes.object.isRequired
}
