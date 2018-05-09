import express from 'express'

import users from '../routes/users/users-index'
import tokens from '../routes/tokens/tokens-index'

export default function route (app) {
  const router = express.Router()
  router.use('/api/users', users)
  router.use('/api/tokens', tokens)
  app.use(router)
}
