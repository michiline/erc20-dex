import mongoose from 'mongoose'

const Schema = mongoose.Schema
const marketSchema = new Schema({
  name: String,
  addressA: String,
  addressB: String,
  type: String
})

export default mongoose.model('Market', marketSchema)
