import React from 'react'
import PropTypes from 'prop-types'

class Logout extends React.Component {
  render () {
    return <h1>Logging out...</h1>
  }
  async componentDidMount () {
    try {
      this.props.parent.func.logout()
    } catch (err) {
      console.log(err)
    }
  }
}

Logout.propTypes = {
  parent: PropTypes.object.isRequired
}

export default Logout
