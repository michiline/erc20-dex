import message from '../../../config/app-message'

export default {
  get (req, res, next) {
    try {
      if (!req.query.addressA || !req.query.addressB || !req.query.active || (!req.query.type && !req.query.makerAddress)) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
