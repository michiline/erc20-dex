import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  render () {
    return (
      <div>
        <h1>Hello guest, welcome to decentralized exchange!</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </div>
    )
  }
}

Home.propTypes = {
  parent: PropTypes.object.isRequired
}
