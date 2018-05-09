import React from 'react'
import { Redirect } from 'react-router-dom'

export default class SimpleRedirect extends React.Component {
  render () {
    return <Redirect to='/' />
  }
}
