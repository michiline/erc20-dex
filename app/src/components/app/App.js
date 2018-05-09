import { Component } from 'react'

import '../../css/App.css'

import appState from './appState'
import appFunctions from './appFunctions'
import appChildren from './appChildren'
import appBody from './appBody'

export default class App extends Component {
  constructor (props) {
    super(props)
    localStorage.clear()
    appState(this)
    appFunctions(this)
    this.func.getWeb3()
    appChildren(this)
  }

  render () {
    return appBody(this)
  }
}
