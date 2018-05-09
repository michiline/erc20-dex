pragma solidity ^0.4.21;

import "./MintableToken.sol";
import "./BurnableToken.sol";

contract Token is MintableToken, BurnableToken {
  string public name;
  string public symbol;

  function Token(string _name, string _symbol, uint _supply) public {
    name = _name;
    symbol = _symbol;
    totalSupply_ = _supply;
    balances[msg.sender] = _supply;
  }
  /* function Token(string _name, uint _supply) public {
    name = _name;
    totalSupply_ = _supply;
    balances[msg.sender] = _supply;
  } */
}
