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
  async getAllActive (req, res, next) {
    try {
      req.orders = await orderRepo.getAllActive(req.body)
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
