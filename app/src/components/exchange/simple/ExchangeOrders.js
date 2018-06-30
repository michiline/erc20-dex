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
      return (
        <div />
      )
    }
    return (
      <div className='row padding border-top rounded-top'>
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
            <th>Price</th>
            <th>{this.props.parent.state.symbolB}</th>
            <th>{this.props.parent.state.symbolA}</th>
            <th>Total {this.props.parent.state.symbolB}</th>
            <th>Total {this.props.parent.state.symbolA}</th>
          </tr>
        </thead>
      )
      let totalA = 0
      let totalB = 0
      const body = this.props.parent.state.buyOrdersRender.map((order, index) => {
        totalA += order.remainingAmountA
        totalB += order.remainingAmountB
        const tr = (
          <tr key={index}>
            <td>{parseInt(order.remainingAmountA, 10) / parseInt(order.remainingAmountB, 10)}</td>
            <td>{order.remainingAmountB}</td>
            <td>{order.remainingAmountA}</td>
            <td>{totalB}</td>
            <td>{totalA}</td>
          </tr>
        )
        return tr
      })
      const renderData = (
        <div className='col-lg'>
          <p><strong>Buy orders</strong></p>
          <table className='table table-borderless green'>
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
            <th>Total {this.props.parent.state.symbolB}</th>
            <th>Total {this.props.parent.state.symbolA}</th>
          </tr>
        </thead>
      )
      let totalA = 0
      let totalB = 0
      const body = this.props.parent.state.sellOrdersRender.map((order, index) => {
        totalA += order.remainingAmountA
        totalB += order.remainingAmountB
        const tr = (
          <tr key={index}>
            <td>{parseInt(order.remainingAmountB, 10) / parseInt(order.remainingAmountA, 10)}</td>
            <td>{order.remainingAmountA}</td>
            <td>{order.remainingAmountB}</td>
            <td>{totalA}</td>
            <td>{totalB}</td>
          </tr>
        )
        return tr
      })
      const renderData = (
        <div className='col-lg'>
          <p><strong>Sell orders</strong></p>
          <table className='table table-borderless red'>
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
