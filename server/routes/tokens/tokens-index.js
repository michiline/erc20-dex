import express from 'express'

import requestAuth from '../users/middleware/users-request-auth'
import requestValidate from './middleware/tokens-request-validate'
import tokensController from './controllers/tokens-controller'
import responseSuccess from './middleware/tokens-response-success'
import responseError from './middleware/tokens-response-error'
import log from '../../config/app-log'

const router = express.Router()

router.get('/',
  requestAuth.checkSession,
  tokensController.get,
  log.success,
  log.error,
  responseSuccess.get,
  responseError.get
)
router.put('/',
  requestAuth.checkSession,
  requestValidate.create,
  tokensController.create,
  log.success,
  log.error,
  responseSuccess.create,
  responseError.create
)

export default router
