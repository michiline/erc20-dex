export default {
  getAllActive (req, res) {
    req.status = 200
    req.data = getAllActive(req.orders)
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message,
    data: req.data
  })
}

function getAllActive (data) {
  const result = data.map(order => {
    return {
      swapID: order.swapID,
      makerAddress: order.makerAddress,
      rate: order.rate,
      initialAmountA: order.initialAmountA,
      initialAmountB: order.initialAmountB,
      remainingAmountA: order.remainingAmountA,
      remainingAmountB: order.remainingAmountB,
      addressA: order.addressA,
      addressB: order.addressB,
      type: order.type
    }
  })
  return result
}
