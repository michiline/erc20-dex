import React from 'react'

import Home from './simple/Home'
import HomeGuest from './simple/HomeGuest'
import Register from './simple/Register'
import Login from './simple/Login'
import Logout from './simple/Logout'
import Tokens from '../tokens/Tokens'
import Exchange from '../exchange/Exchange'

export default function appChildren (_this) {
  _this.children = {
    Home: HomeWrapper.bind(_this),
    HomeGuest: HomeGuestWrapper.bind(_this),
    Register: RegisterWrapper.bind(_this),
    Login: LoginWrapper.bind(_this),
    Logout: LogoutWrapper.bind(_this),
    Tokens: TokensWrapper.bind(_this),
    Exchange: ExchangeWrapper.bind(_this)
  }
}
// Components wrappers
function HomeWrapper () {
  return <Home
    parent={this.func.parentWrapper(this)}
  />
}
function HomeGuestWrapper () {
  return <HomeGuest
    parent={this.func.parentWrapper(this)}
  />
}
function LoginWrapper () {
  return <Login
    parent={this.func.parentWrapper(this)}
  />
}
function LogoutWrapper () {
  return <Logout
    parent={this.func.parentWrapper(this)}
  />
}
function RegisterWrapper () {
  return <Register
    parent={this.func.parentWrapper(this)}
  />
}
function TokensWrapper () {
  return <Tokens
    parent={this.func.parentWrapper(this)}
  />
}
function ExchangeWrapper (props) {
  return <Exchange
    parent={this.func.parentWrapper(this)}
    match={props.match}
    history={props.history}
  />
}
