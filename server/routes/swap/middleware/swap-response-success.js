import message from '../../../config/app-message'

export default {
  create (req, res) {
    req.status = 200
    req.message = message.success.swapCreated
    req.data = req.swap
    return sendResponse(req, res)
  },
  get (req, res) {
    req.status = 200
    req.data = mapSwapGet(req.swap[0])
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message,
    data: req.data
  })
}

function concatString (array) {
  return array.reduce((acc, curr) => {
    return acc.concat(curr)
  }, '')
}

function mapSwapGet (swap) {
  return {
    jsonInterface: concatString(swap.jsonInterface),
    address: swap.address
  }
}
