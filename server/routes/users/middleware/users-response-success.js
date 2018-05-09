import message from '../../../config/app-message'

export default {
  register (req, res) {
    req.status = 200
    req.message = message.success.userCreated
    req.data = mapUser(req.user)
    return sendResponse(req, res)
  },
  login (req, res) {
    req.status = 200
    req.message = message.success.userLoggedIn
    req.data = mapUser(req.user)
    return sendResponse(req, res)
  },
  logout (req, res) {
    req.status = 200
    req.message = message.success.userLoggedOut
    return sendResponse(req, res)
  },
  checkSession (req, res) {
    req.status = 200
    req.message = message.success.userLoggedIn
    req.data = mapUser(req.user)
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message,
    data: req.data
  })
}

function mapUser (data) {
  return {
    username: data.username
  }
}
