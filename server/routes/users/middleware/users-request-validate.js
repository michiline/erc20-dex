import message from '../../../config/app-message'

export default {
  register (req, res, next) {
    try {
      if (!req.body.username || !req.body.password) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  },
  login (req, res, next) {
    try {
      if (!req.body.username || !req.body.password) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
