import React from 'react'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.body = this.body.bind(this)
    this.inputUsername = this.inputUsername.bind(this)
    this.inputPassword = this.inputPassword.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  render () {
    return (
      <div>
        <input type='text' value={this.state.username} onChange={e => this.inputUsername(e)} placeholder='enter your username' />
        <br />
        <input type='password' value={this.state.password} onChange={e => this.inputPassword(e)} placeholder='enter your password' />
        <br />
        <input type='button' value='Log in' onClick={this.onClick} />
      </div>
    )
  }
  inputUsername (e) {
    this.setState({
      username: e.target.value
    })
  }

  inputPassword (e) {
    this.setState({
      password: e.target.value
    })
  }
  onClick (e) {
    e.preventDefault()
    try {
      this.props.parent.func.login({
        username: this.state.username,
        password: this.state.password
      })
    } catch (err) {
      this.setState({
        username: '',
        password: ''
      })
      console.log(err)
    }
  }
}

Login.propTypes = {
  parent: PropTypes.object.isRequired
}
