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
    this.inputUsername = this.inputUsername.bind(this)
    this.inputPassword = this.inputPassword.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  render () {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='/'>Decentralized exchange</a>
          <div className='collapse navbar-collapse'>
            <div className='navbar-nav'>
              <a className='nav-item nav-link active' href='/'>Home</a>
              <a className='nav-item nav-link' href='/register'>Register </a>
              <a className='nav-item nav-link' href='/login'>Login  <span className='sr-only'>(current)</span></a>
            </div>
          </div>
        </nav>
        <div className='container'>
          <div className='row login-row'>
            <div className='col-lg-4' />
            <div className='col-lg-4'>
              <form>
                <div className='form-group'>
                  <label>Username</label>
                  <input value={this.state.username} onChange={e => this.inputUsername(e)} type='text' className='form-control' placeholder='Enter username' />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input value={this.state.password} onChange={e => this.inputPassword(e)} type='password' className='form-control' placeholder='Enter password' />
                </div>
                <button onClick={this.onClick} type='submit' className='btn btn-secondary'>Log in</button>
              </form>
            </div>
            <div className='col-lg-4' />
          </div>
        </div>
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
