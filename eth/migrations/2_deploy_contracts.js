const ERC20Swap = artifacts.require('./ERC20Swap.sol')

module.exports = function (deployer) {
  deployer.deploy(ERC20Swap)
}
