import message from '../../../config/app-message'

export default {
  create (req, res) {
    req.status = 200
    req.message = message.success.tokenCreated
    req.data = mapTokenCreate(req.token)
    return sendResponse(req, res)
  },
  get (req, res) {
    req.status = 200
    req.data = mapTokensGet(req.tokens)
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message,
    data: req.data
  })
}

function mapTokenCreate (data) {
  return {
    address: data.options.address,
    jsonInterface: data.options.jsonInterface
  }
}

function mapTokensGet (data) {
  return data.map(token => {
    return {
      jsonInterface: concatString(token.jsonInterface),
      address: token.address
    }
  })
}

function concatString (array) {
  return array.reduce((acc, curr) => {
    return acc.concat(curr)
  }, '')
}
