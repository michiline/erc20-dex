import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  componentWillMount () {
    this.props.parent.func.checkSession()
  }
  render () {
    return (
      <div>
        <h1>Hello {this.props.parent.state.username}, welcome to decentralized exchange!</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/tokens'>Tokens</Link></li>
          <li><Link to='/logout'>Logout</Link></li>
        </ul>
      </div>
    )
  }
}

Home.propTypes = {
  parent: PropTypes.object.isRequired
}
