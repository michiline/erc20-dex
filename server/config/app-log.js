export default {
  success (req, res, next) {
    console.log(getTime() + ' ' + req.ip + ' ' + req.url + ' - user: ' + req.user.username)
    return next()
  },
  error (err, req, res, next) {
    console.log(getTime() + ' ' + req.ip + ' ' + req.url + ': ' + err.message)
    return next(err)
  }
}
function getTime () {
  const time = new Date().getTime()
  return new Date(time)
}
