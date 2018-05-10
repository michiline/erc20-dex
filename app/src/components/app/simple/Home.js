import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  render () {
    const exchangeUrl = `/exchange/${localStorage.getItem('chosenMarket') || 'none'}`
    return (
      <div>
        <h1>Hello {this.props.parent.state.username}, welcome to decentralized exchange!</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/tokens'>Tokens</Link></li>
          <li><Link to={exchangeUrl}>Exchange</Link></li>
          <li><Link to='/logout'>Logout</Link></li>
        </ul>
      </div>
    )
  }
}

Home.propTypes = {
  parent: PropTypes.object.isRequired
}
