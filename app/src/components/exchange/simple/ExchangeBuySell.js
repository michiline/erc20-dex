import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExchangeBuySell extends Component {
  render () {
    return (
      <div>
        <div>
          <h3>Buy</h3>
          <p><strong>Available: </strong>{`${this.props.parent.state.token1Balance} ${this.props.parent.state.token1Symbol}`}</p>
        </div>
        <div>
          <h3>Sell</h3>
          <p><strong>Available: </strong>{`${this.props.parent.state.token2Balance} ${this.props.parent.state.token2Symbol}`}</p>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.parent.func.getTokensInfo()
  }
}

ExchangeBuySell.propTypes = {
  parent: PropTypes.object.isRequired
}

// static getDerivedStateFromProps (nextProps, prevState) {
//   const changed = nextProps.parent.state.token1Symbol !== prevState.token1Symbol || nextProps.parent.state.token2Symbol !== prevState.token2Symbol
//   if (changed) {
//     return {
//       token1Symbol: nextProps.parent.state.token1Symbol,
//       token2Symbol: nextProps.parent.state.token2Symbol,
//       token1Balance: nextProps.parent.state.token1Balance,
//       token2Balance: nextProps.parent.state.token2Balance
//     }
//   } else {
//     return null
//   }
// }
