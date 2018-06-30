import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Home extends Component {
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  render () {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='/'>Decentralized exchange</a>
          <div className='collapse navbar-collapse'>
            <div className='navbar-nav'>
              <a className='nav-item nav-link active' href='/'>Home <span className='sr-only'>(current)</span></a>
              <a className='nav-item nav-link' href='/register'>Register</a>
              <a className='nav-item nav-link' href='/login'>Login</a>
            </div>
          </div>
        </nav>
        <div className='jumbotron jumbotron-fluid'>
          <div className='container'>
            <h1 className='display-4'>Hello guest, welcome to decentralized exchange!</h1>
            <p className='lead'>Don't waste time! Create your account and start trading.</p>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  parent: PropTypes.object.isRequired
}
