export default class Api {
  constructor (axios) {
    this.axios = axios
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.createToken = this.createToken.bind(this)
    this.getTokens = this.getTokens.bind(this)
    this.getSwap = this.getSwap.bind(this)
    this.getOrders = this.getOrders.bind(this)
  }

  // ************ USER API ************

  async register (data) {
    const res = await this.axios({
      method: 'post',
      url: '/api/users/register',
      data: data
    })
    return res.data
  }

  async login (data) {
    const res = await this.axios({
      method: 'post',
      url: '/api/users/login',
      data: data
    })
    return res.data
  }

  async logout () {
    const res = await this.axios({
      method: 'get',
      url: '/api/users/logout'
    })
    return res.data
  }

  async checkSession () {
    const res = await this.axios({
      method: 'get',
      url: '/api/users/check-session'
    })
    return res.data
  }

  async getTokens () {
    const res = await this.axios({
      method: 'get',
      url: '/api/tokens'
    })
    return res.data
  }

  async createToken (data) {
    const res = await this.axios({
      method: 'put',
      url: '/api/tokens',
      data: data
    })
    return res.data
  }

  async getSwap (data) {
    const res = await this.axios({
      method: 'get',
      url: '/api/swap'
    })
    return res.data
  }

  async getOrders (data) {
    const res = await this.axios({
      method: 'post',
      url: '/api/orders',
      data: data
    })
    return res.data
  }
}
