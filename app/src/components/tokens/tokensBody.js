import React from 'react'
import { Link, Route } from 'react-router-dom'

export default function tokensBody (_this) {
  return (
    <div>
      <ul>
        <li><Link to='/tokens/balance'>Tokens Balance</Link></li>
        <li><Link to='/tokens/create'>Create Token</Link></li>
      </ul>
      <Route exact path='/tokens/balance' component={_this.children.Balance} />
      <Route exact path='/tokens/create' component={_this.children.Create} />
    </div>
  )
}
