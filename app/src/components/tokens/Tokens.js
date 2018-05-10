import { Component } from 'react'
import PropTypes from 'prop-types'

import '../../css/App.css'

import tokensState from './tokensState'
import tokensFunctions from './tokensFunctions'
import tokensChildren from './tokensChildren'
import tokensBody from './tokensBody'

export default class Tokens extends Component {
  constructor (props) {
    super(props)
    tokensState(this)
    tokensFunctions(this)
    tokensChildren(this)
  }
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  render () {
    return tokensBody(this)
  }
}

Tokens.propTypes = {
  parent: PropTypes.object.isRequired
}
