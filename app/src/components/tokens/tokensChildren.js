import React from 'react'

import Balance from './simple/TokensBalance'
import Create from './simple/TokensCreate'

export default function tokensChildren (_this) {
  _this.children = {
    Balance: BalanceWrapper.bind(_this),
    Create: CreateWrapper.bind(_this)
  }
}
// Components wrappers
function BalanceWrapper () {
  return <Balance
    parent={this.func.parentWrapper(this)}
  />
}
function CreateWrapper () {
  return <Create
    parent={this.func.parentWrapper(this)}
  />
}
