import message from '../../../config/app-message'

export default {
  getAllActive (err, req, res, next) {
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
