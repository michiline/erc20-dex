import message from '../../../config/app-message'

export default {
  create (req, res, next) {
    try {
      if (!req.body.from || !req.body.name || !req.body.symbol || !req.body.supply) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  },
  mint (req, res, next) {
    try {
      if (!req.body.from || !req.body.symbol || !req.body.amount) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
