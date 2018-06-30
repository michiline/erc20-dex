import Market from '../models/market-model'

export default {
  create (data) {
    const market = new Market(data)
    return market.save()
  },
  getByAddresses (addressA, addressB) {
    const query = {
      addressA: addressA,
      addressB: addressB
    }
    return Market.findOne(query)
  },
  getAll () {
    const query = {}
    return Market.find(query).sort({ symbol: 'asc' })
  }
}
