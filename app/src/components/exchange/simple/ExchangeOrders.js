import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExchangeOrders extends Component {
  constructor (props) {
    super(props)
    this.buy = this.buy.bind(this)
    this.sell = this.sell.bind(this)
  }
  render () {
    if (this.props.parent.state.buyOrders.length === 0 && this.props.parent.state.sellOrders.length === 0) {
      return 'n/a'
    }
    return (
      <div>
        {this.buy()}
        {this.sell()}
      </div>
    )
  }
  componentDidMount () {
    this.props.parent.func.getOrders()
  }

  buy () {
    try {
      const headers = (
        <thead>
          <tr>
            <th>#</th>
            <th>Amount {this.props.parent.state.symbolB}</th>
            <th>Price</th>
            <th>Total {this.props.parent.state.symbolA}</th>
          </tr>
        </thead>
      )
      const body = this.props.parent.state.buyOrders.map((order, index) => {
        const tr = (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{order.remainingAmountB}</td>
            <td>{parseInt(order.remainingAmountA, 10) / parseInt(order.remainingAmountB, 10)}</td>
            <td>{order.remainingAmountA}</td>
          </tr>
        )
        return tr
      })
      const renderData = (
        <div>
          <p><strong>Buy orders</strong></p>
          <table>
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
            <th>#</th>
            <th>Amount {this.props.parent.state.symbolB}</th>
            <th>Price</th>
            <th>Total {this.props.parent.state.symbolA}</th>
          </tr>
        </thead>
      )
      const body = this.props.parent.state.sellOrders.map((order, index) => {
        const tr = (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{order.remainingAmountA}</td>
            <td>{parseInt(order.remainingAmountB, 10) / parseInt(order.remainingAmountA, 10)}</td>
            <td>{order.remainingAmountB}</td>
          </tr>
        )
        return tr
      })
      const renderData = (
        <div>
          <p><strong>Sell orders</strong></p>
          <table>
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
}

ExchangeOrders.propTypes = {
  parent: PropTypes.object.isRequired
}
