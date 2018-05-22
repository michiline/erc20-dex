import axios from 'axios'

import Api from '../../api/Api'
import getWeb3js from '../../utils/getWeb3js'

export default function appFunctions (_this) {
  _this.api = new Api(axios.create())
  // functions
  _this.func = {
    parentWrapper: parentWrapper,
    getWeb3: getWeb3.bind(_this),
    getSwap: getSwap.bind(_this),
    register: register.bind(_this),
    login: login.bind(_this),
    logout: logout.bind(_this),
    checkSession: checkSession.bind(_this)
  }
}

// helper functions
function parentWrapper (_this) {
  return {
    state: _this.state,
    func: _this.func,
    api: _this.api
  }
}

async function getWeb3 () {
  const results = await getWeb3js
  this.setState({
    web3: results.web3
  })
}
async function getSwap () {
  const resSwap = await this.api.getSwap()
  const swapContract = new this.state.web3.eth.Contract(JSON.parse(resSwap.data.jsonInterface), resSwap.data.address)
  return swapContract
}

async function register (data) {
  await this.api.register(data)
  await this.func.login(data)
}
async function login (data) {
  await this.api.login(data)
  localStorage.setItem('username', data.username)
  this.setState({
    username: data.username
  })
}
async function logout () {
  await this.api.logout()
  localStorage.clear()
  this.setState({
    username: ''
  })
}
async function checkSession () {
  try {
    if (this.state.username.length !== 0) {
      await this.api.checkSession()
    }
  } catch (err) {
    console.log(err)
    await this.api.logout()
  }
}
