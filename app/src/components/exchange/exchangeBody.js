import React from 'react'

export default function exchangeBody (_this) {
  const exchangeUrl = `/exchange/${localStorage.getItem('chosenMarket') || 'none'}`
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='/'>Decentralized exchange</a>
        <div className='collapse navbar-collapse'>
          <div className='navbar-nav'>
            <a className='nav-item nav-link active' href='/'>Home <span className='sr-only'>(current)</span></a>
            <a className='nav-item nav-link' href='/tokens/balance'>Tokens</a>
            <a className='nav-item nav-link' href={exchangeUrl}>Exchange</a>
            <a className='nav-item nav-link' href='/logout'>Logout</a>
          </div>
        </div>
      </nav>
      <div className='container dark-grey margin-top'>
        {_this.children.MarketPick()}
        {_this.children.BuySell()}
        <h3>Market Orders</h3>
        {_this.children.Orders()}
        <h3>Open Orders</h3>
        {_this.children.OpenOrders()}

      </div>
    </div>
  )
}
