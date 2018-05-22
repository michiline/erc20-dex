import Order from '../models/order-model'

export default {
  async create (data) {
    const order = new Order(data)
    return order.save()
  },
  async update (query, update) {
    const options = { 'new': true }
    return Order.findOneAndUpdate(query, update, options)
  },
  async getAllActive (data) {
    const query = {
      addressA: data.addressA,
      addressB: data.addressB,
      active: true
    }
    return Order.find(query).sort({ rate: data.type === 'buy' ? 'desc' : 'asc' })
  },
  async close (id, closeTrader) {
    const options = { 'new': true }
    const update = {
      closeTrader: closeTrader,
      active: false
    }
    return Order.findByIdAndUpdate(id, update, options)
  }
}
