import express from 'express'

import requestAuth from '../users/middleware/users-request-auth'
import swapController from './controllers/swap-controller'
import responseSuccess from './middleware/swap-response-success'
import responseError from './middleware/swap-response-error'
import log from '../../config/app-log'

const router = express.Router()

router.get('/',
  requestAuth.checkSession,
  swapController.get,
  log.success,
  log.error,
  responseSuccess.get,
  responseError.get
)
router.put('/',
  requestAuth.checkSession,
  swapController.create,
  log.success,
  log.error,
  responseSuccess.create,
  responseError.create
)

export default router
