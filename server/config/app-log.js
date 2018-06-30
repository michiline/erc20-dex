export default {
  success (req, res, next) {
    console.log(getTime() + ' ' + req.ip + ' ' + req.method + ' ' + req.originalUrl + ' - user: ' + req.user.username)
    return next()
  },
  error (err, req, res, next) {
    console.log(getTime() + ' ' + req.ip + ' ' + req.originalUrl + ': ' + err.message)
    return next(err)
  }
}
function getTime () {
  const time = new Date().getTime()
  return new Date(time)
}
