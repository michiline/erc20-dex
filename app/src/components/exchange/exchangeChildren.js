import React from 'react'

import MarketPick from './simple/ExchangeMarketPick'
import BuySell from './simple/ExchangeBuySell'
import Orders from './simple/ExchangeOrders'

export default function exchangeChildren (_this) {
  _this.children = {
    MarketPick: MarketPickWrapper.bind(_this),
    BuySell: BuySellWrapper.bind(_this),
    Orders: OrdersWrapper.bind(_this)
  }
}
// Components wrappers
function MarketPickWrapper () {
  return <MarketPick
    parent={this.func.parentWrapper(this)}
  />
}
function BuySellWrapper () {
  return <BuySell
    parent={this.func.parentWrapper(this)}
  />
}
function OrdersWrapper () {
  return <Orders
    parent={this.func.parentWrapper(this)}
  />
}
