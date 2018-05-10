import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SimpleRedirect from './simple/SimpleRedirect'

export default function appBody (_this) {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={_this.state.username.length === 0 ? _this.children.HomeGuest : _this.children.Home} />
        <Route exact path='/register' component={_this.state.username.length === 0 ? _this.children.Register : SimpleRedirect} />
        <Route exact path='/login' component={_this.state.username.length === 0 ? _this.children.Login : SimpleRedirect} />
        <Route exact path='/logout' component={_this.state.username.length !== 0 ? _this.children.Logout : SimpleRedirect} />
        <Route path='/tokens' component={_this.state.username.length !== 0 ? _this.children.Tokens : SimpleRedirect} />
        <Route path='/exchange/:chosenMarket' component={_this.state.username.length !== 0 ? _this.children.Exchange : SimpleRedirect} />
      </Switch>
    </div>
  )
}
