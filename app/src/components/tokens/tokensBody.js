import React from 'react'
import { NavLink, Route } from 'react-router-dom'

export default function tokensBody (_this) {
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
      <div className='container'>
        <div className='row padding-top'>
          <div className='col-lg-2'>
            <div className='nav flex-column bounty-nav dark-grey'>
              <NavLink className='nav-link bounty-navlink' to='/tokens/balance' activeClassName='active-bounty-navlink'> Balances </NavLink>
              <NavLink className='nav-link bounty-navlink' to='/tokens/create' activeClassName='active-bounty-navlink'> Create new token </NavLink>
            </div>
          </div>
          <div className='col-lg dark-grey'>
            <Route exact path='/tokens/balance' component={_this.children.Balance} />
            <Route exact path='/tokens/create' component={_this.children.Create} />
          </div>
        </div>
      </div>
    </div>
  )
}
