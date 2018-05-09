import userRepo from '../repos/user-repo'
import message from '../../../config/app-message'

export default {
  async register (req, res, next) {
    try {
      req.user = await userRepo.create(req.body)
      return next()
    } catch (err) {
      return next(err)
    }
  },
  async login (req, res, next) {
    try {
      req.user = await userRepo.getByUsername(req.body.username)
      if (!req.user) {
        throw new Error(message.error.invalidUsernameOrPassword)
      }
      const validPassword = await userRepo.checkPassword(req.body.password, req.user.password)
      if (!validPassword) {
        throw new Error(message.error.invalidUsernameOrPassword)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
