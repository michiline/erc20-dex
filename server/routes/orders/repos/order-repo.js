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
  async get (query, type) {
    if (type) {
      return Order.find(query).sort({ rate: type === 'buy' ? 'desc' : 'asc' })
    }
    return Order.find(query).sort({ created: 'desc' })
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
