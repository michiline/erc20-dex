import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
})

export default mongoose.model('Session', sessionSchema)
