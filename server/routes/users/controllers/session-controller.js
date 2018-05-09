import sessionRepo from '../repos/session-repo'
// import message from '../../../config/app-message'

export default {
  async login (req, res, next) {
    try {
      req.session = await sessionRepo.deleteExistingAndCreate(req.user._id)
      res.cookie('sid', req.session.sid)
      return next()
    } catch (err) {
      return next(err)
    }
  },
  async logout (req, res, next) {
    try {
      await sessionRepo.removeBySid(req.cookies.sid)
      res.cookie('sid', '', {
        expires: new Date(Date.now())
      })
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
