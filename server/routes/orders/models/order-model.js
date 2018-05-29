import mongoose from 'mongoose'

const Schema = mongoose.Schema
const orderSchema = new Schema({
  swapID: {
    type: String
  },
  makerAddress: {
    type: String
  },
  rate: {
    type: Number
  },
  initialAmountA: {
    type: Number
  },
  initialAmountB: {
    type: Number
  },
  remainingAmountA: {
    type: Number
  },
  remainingAmountB: {
    type: Number
  },
  addressA: {
    type: String
  },
  addressB: {
    type: String
  },
  active: {
    default: true,
    type: Boolean
  },
  type: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Order', orderSchema)
