import express from 'express'
import Web3 from 'web3'
import Swap from '../swap/models/swap-model'
import Order from './models/order-model'
import orderRepo from './repos/order-repo'
import marketRepo from '../tokens/repos/market-repo'

import requestAuth from '../users/middleware/users-request-auth'
import requestValidate from './middleware/orders-request-validate'
import ordersController from './controllers/orders-controller'
import responseSuccess from './middleware/orders-response-success'
import responseError from './middleware/orders-response-error'
import log from '../../config/app-log'

const router = express.Router()
const web3 = new Web3(new Web3.providers.WebsocketProvider('http://127.0.0.1:9545'))

async function initateListeners () {
  try {
    const swapContractArray = await Swap.find({})
    const swapContractData = swapContractArray[0]
    const swapContract = new web3.eth.Contract(JSON.parse(concatString(swapContractData.jsonInterface)), swapContractData.address)
    swapContract.events.Open({ fromBlock: 'latest' }, async (err, event) => {
      if (err) {
        throw err
      }
      try {
        const order = await swapContract.methods.check(event.returnValues._swapID).call()
        const market = await marketRepo.getByAddresses(order.addressA, order.addressB)
        const orderData = {
          swapID: event.returnValues._swapID,
          makerAddress: order.makerAddress,
          initialAmountA: order.initialAmountA,
          initialAmountB: order.initialAmountB,
          rate: market.type === 'buy' ? order.initialAmountA / order.initialAmountB : order.initialAmountB / order.initialAmountA,
          remainingAmountA: order.remainingAmountA,
          remainingAmountB: order.remainingAmountB,
          addressA: order.addressA,
          addressB: order.addressB,
          type: market.type
        }
        const orderSave = new Order(orderData)
        await orderSave.save()
        console.log('OPEN: ' + orderData)
      } catch (err) {
        console.log(err)
      }
    })
    swapContract.events.Fill({ fromBlock: 'latest' }, async (err, event) => {
      if (err) {
        throw err
      }
      try {
        const order = await swapContract.methods.check(event.returnValues._swapID).call()
        const query = {
          swapID: event.returnValues._swapID
        }
        const update = {
          remainingAmountA: order.remainingAmountA,
          remainingAmountB: order.remainingAmountB
        }
        await orderRepo.update(query, update)
        console.log('FILL: ' + update)
      } catch (err) {
        console.log(err)
      }
    })
    swapContract.events.Close({ fromBlock: 'latest' }, async (err, event) => {
      if (err) {
        throw err
      }
      try {
        const query = {
          swapID: event.returnValues._swapID
        }
        const update = {
          active: false
        }
        await orderRepo.update(query, update)
        console.log('CLOSE: ' + query)
      } catch (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

function concatString (array) {
  return array.reduce((acc, curr) => {
    return acc.concat(curr)
  }, '')
}
// get all active for given market
router.post('/',
  requestAuth.checkSession,
  requestValidate.getAllActive,
  ordersController.getAllActive,
  log.success,
  log.error,
  responseSuccess.getAllActive,
  responseError.getAllActive
)

initateListeners()

export default router
