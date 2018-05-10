import mongoose from 'mongoose'

const Schema = mongoose.Schema
const tokenSchema = new Schema({
  name: String,
  symbol: String,
  address: {
    type: String,
    unique: true,
    required: true
  },
  jsonInterface: [{
    type: String
  }]
})

export default mongoose.model('Token', tokenSchema)
