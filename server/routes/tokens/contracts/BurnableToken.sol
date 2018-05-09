pragma solidity ^0.4.21;

import "./ERC20Token.sol";


contract BurnableToken is ERC20Token {

  event Burn(address indexed burner, uint256 value);

  function burn(uint256 _value) public {
    require(_value <= balances[msg.sender]);

    address burner = msg.sender;
    assert(_value <= balances[burner]);
    balances[burner] -= _value;

    assert(_value <= totalSupply_);
    totalSupply_ -= _value;

    emit Burn(burner, _value);
    emit Transfer(burner, address(0), _value);
  }
}
