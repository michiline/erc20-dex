import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Home extends Component {
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  render () {
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
        <div className='jumbotron jumbotron-fluid'>
          <div className='container'>
            <h1 className='display-4'>Hello <strong>{this.props.parent.state.username}</strong>, welcome to decentralized exchange!</h1>
            <p className='lead'>Don't waste time! Create your own token and head over to exchange to start trading.</p>
          </div>
        </div>
      </div>

    )
  }
}

Home.propTypes = {
  parent: PropTypes.object.isRequired
}
