import message from '../../../config/app-message'

export default {
  getAllActive (req, res, next) {
    try {
      if (!req.body.type || !req.body.addressA || !req.body.addressB) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
