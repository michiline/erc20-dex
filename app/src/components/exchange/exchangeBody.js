import React from 'react'
import { Link } from 'react-router-dom'

export default function exchangeBody (_this) {
  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
      {_this.children.MarketPick()}
      {_this.children.BuySell()}
    </div>
  )
}
