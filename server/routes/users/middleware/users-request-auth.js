import userRepo from '../repos/user-repo'
import sessionRepo from '../repos/session-repo'
import message from '../../../config/app-message'

export default {
  async checkSession (req, res, next) {
    try {
      req.session = await sessionRepo.getBySid(req.cookies.sid)
      if (!req.session) {
        throw new Error(message.error.unauthorized)
      }
      req.user = await userRepo.getById(req.session.userId)
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
