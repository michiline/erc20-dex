import Session from '../models/session-model'
import uuidv4 from 'uuid/v4'

export default {
  async create (userId) {
    const session = new Session({
      sid: uuidv4(),
      userId: userId
    })
    return session.save()
  },
  async getBySid (sid) {
    return Session.findOne({
      sid: sid
    })
  },
  async removeBySid (sid) {
    const session = await this.getBySid(sid)
    return session.remove()
  },
  async deleteExistingAndCreate (userId) {
    const query = {
      userId: userId
    }
    const existingSession = await Session.findOne(query)
    if (existingSession) {
      await existingSession.remove()
    }
    return this.create(userId)
  }
}
