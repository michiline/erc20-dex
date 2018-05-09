import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    return next()
  })
})

export default mongoose.model('User', userSchema)
