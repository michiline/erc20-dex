import Token from '../models/token-model'

export default {
  async create (data) {
    const token = new Token(data)
    return token.save()
  },
  async getByAddress (address) {
    const query = {
      address: address
    }
    return Token.findOne(query)
  },
  async getAll () {
    const query = {}
    return Token.find(query).sort({ symbol: 'asc' })
  },
  prepareTokenData (token, body) {
    return {
      name: body.name,
      symbol: body.symbol,
      address: token.options.address,
      jsonInterface: splitString(JSON.stringify(token.options.jsonInterface), 1000)
    }
  }
}
function splitString (string, size) {
  const re = new RegExp('.{1,' + size + '}', 'g')
  return string.match(re)
}
