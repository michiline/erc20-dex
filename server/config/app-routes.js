import express from 'express'

import users from '../routes/users/users-index'
import tokens from '../routes/tokens/tokens-index'
import swap from '../routes/swap/swap-index'
import orders from '../routes/orders/orders-index'

export default function route (app) {
  const router = express.Router()
  router.use('/api/users', users)
  router.use('/api/tokens', tokens)
  router.use('/api/swap', swap)
  router.use('/api/orders', orders)
  app.use(router)
}
