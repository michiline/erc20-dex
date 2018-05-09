require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity)/
})
require('babel-polyfill')
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
}
