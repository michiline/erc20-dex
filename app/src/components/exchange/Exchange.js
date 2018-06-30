import { Component } from 'react'
import PropTypes from 'prop-types'

import '../../css/App.css'

import exchangeState from './exchangeState'
import exchangeFunctions from './exchangeFunctions'
import exchangeChildren from './exchangeChildren'
import exchangeBody from './exchangeBody'

export default class Exchange extends Component {
  constructor (props) {
    super(props)
    exchangeState(this)
    exchangeFunctions(this)
    exchangeChildren(this)
  }
  componentDidMount () {
    this.props.parent.func.checkSession()
  }
  render () {
    return exchangeBody(this)
  }
}

Exchange.propTypes = {
  parent: PropTypes.object.isRequired
}
