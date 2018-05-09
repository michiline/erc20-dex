import User from '../models/user-model'
import bcrypt from 'bcrypt'

export default {
  async create (data) {
    const user = new User(data)
    return user.save()
  },
  async getById (id) {
    return User.findById(id)
  },
  async getByUsername (username) {
    const query = {
      username: username
    }
    return User.findOne(query)
  },
  async checkPassword (password, dbPassword) {
    return bcrypt.compare(password, dbPassword)
  }
}
