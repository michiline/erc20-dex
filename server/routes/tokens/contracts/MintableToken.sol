pragma solidity ^0.4.21;

import "./ERC20Token.sol";
import "./Ownable.sol";


contract MintableToken is ERC20Token, Ownable {
  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  bool public mintingFinished = false;

  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
    uint256 c = totalSupply_ + _amount;
    assert (c >= totalSupply_);
    totalSupply_ = c;

    uint256 d = balances[_to] + _amount;
    assert (d >= balances[_to]);
    balances[_to] = d;

    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
    return true;
  }

  function finishMinting() onlyOwner canMint public returns (bool) {
    mintingFinished = true;
    emit MintFinished();
    return true;
  }
}
