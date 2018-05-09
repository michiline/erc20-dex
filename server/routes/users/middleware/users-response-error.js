import message from '../../../config/app-message'

export default {
  register (err, req, res, next) {
    if (err.message.startsWith('E11000')) {
      req.message = message.error.usernameExists
      req.status = 400
    } else if (err.message === message.error.invalidData) {
      req.message = message.error.invalidData
      req.status = 400
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  },
  login (err, req, res, next) {
    if (err.message === message.error.invalidUsernameOrPassword) {
      req.message = message.error.invalidUsernameOrPassword
      req.status = 400
    } else if (err.message === message.error.invalidData) {
      req.message = message.error.invalidData
      req.status = 400
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  },
  logout (err, req, res, next) {
    if (err.message === message.error.unauthorized) {
      req.message = message.error.unauthorized
      req.status = 401
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  },
  checkSession (err, req, res, next) {
    if (err.message === message.error.unauthorized) {
      req.message = message.error.unauthorized
      req.status = 401
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message
  })
}

function generalError (req) {
  req.message = message.error.internalServerError
  req.status = 500
}
