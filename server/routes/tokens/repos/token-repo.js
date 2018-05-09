import Token from '../models/token-model'

export default {
  async create (data) {
    const tokenData = saveToken(data)
    const token = new Token(tokenData)
    return token.save()
  },
  async getByAddress (address) {
    const query = {
      address: address
    }
    const token = Token.findOne(query)
    return token
  },
  async getAll () {
    const query = {}
    return Token.find(query)
  }
}

function saveToken (token) {
  return {
    address: token.options.address,
    jsonInterface: splitString(JSON.stringify(token.options.jsonInterface), 1000)
  }
}

function splitString (string, size) {
  const re = new RegExp('.{1,' + size + '}', 'g')
  return string.match(re)
}
