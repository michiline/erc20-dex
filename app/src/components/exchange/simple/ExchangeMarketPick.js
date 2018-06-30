import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExchangeMarketPick extends Component {
  render () {
    return (
      <div className='row padding'>
        <div className='col-lg'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3'>
                <h3>Choose market: </h3>
              </div>
              <div className='col-lg-2'>
                <select value={this.props.parent.state.chosenMarket} onChange={e => this.props.parent.func.marketPick(e.target.value)} className='form-control'>
                  {marketOptions(this.props.parent.state.markets)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.parent.func.getMarkets()
  }
}

function marketOptions (markets) {
  if (!markets) {
    return <option key={0} value={'Loading...'}>Loading...</option>
  }
  return markets.map((market, index) => {
    return <option key={index} value={market}>{market}</option>
  })
}

ExchangeMarketPick.propTypes = {
  parent: PropTypes.object.isRequired
}
