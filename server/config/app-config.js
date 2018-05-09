import mongoose from 'mongoose'
import bluebird from 'bluebird'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

export default function configure (app) {
  dotenv.config()
  mongoose.connect('mongodb://localhost/dex-test')

  global.Promise = bluebird
  mongoose.Promise = bluebird

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  app.use(cookieParser())
  app.use(bodyParser.json())
}
