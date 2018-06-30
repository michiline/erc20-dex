import orderRepo from '../../orders/repos/order-repo'

export default {
  async create (req, res, next) {
    try {
      req.order = await orderRepo.create(req.body)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async get (req, res, next) {
    try {
      const query = {
        addressA: req.query.addressA,
        addressB: req.query.addressB,
        active: req.query.active
      }
      if (req.query.makerAddress) {
        query.makerAddress = req.query.makerAddress
      }
      if (req.query.type) {
        req.orders = await orderRepo.get(query, req.query.type)
      } else {
        req.orders = await orderRepo.get(query)
      }
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async close (req, res, next) {
    try {
      req.order = await orderRepo.close(req.params.orderId, req.body.closeTrader)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}
