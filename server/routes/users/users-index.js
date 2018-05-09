import express from 'express'

import requestAuth from './middleware/users-request-auth'
import requestValidate from './middleware/users-request-validate'
import userController from './controllers/user-controller'
import sessionController from './controllers/session-controller'
import responseSuccess from './middleware/users-response-success'
import responseError from './middleware/users-response-error'
import log from '../../config/app-log'

const router = express.Router()

router.post('/register',
  requestValidate.register,
  userController.register,
  log.success,
  log.error,
  responseSuccess.register,
  responseError.register
)

router.post('/login',
  requestValidate.login,
  userController.login,
  sessionController.login,
  log.success,
  log.error,
  responseSuccess.login,
  responseError.login
)

router.get('/logout',
  requestAuth.checkSession,
  sessionController.logout,
  log.success,
  log.error,
  responseSuccess.logout,
  responseError.logout
)

router.get('/check-session',
  requestAuth.checkSession,
  log.success,
  log.error,
  responseSuccess.checkSession,
  responseError.checkSession
)

export default router
