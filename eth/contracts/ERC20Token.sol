pragma solidity ^0.4.21;

import "./ERC20Interface.sol";

contract ERC20Token is ERC20Interface {

  uint256 totalSupply_;
  mapping(address => uint256) balances;
  mapping (address => mapping (address => uint256)) internal allowed;

  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    assert(_value <= balances[msg.sender]);
    balances[msg.sender] -= _value;

    uint256 c = balances[_to] + _value;
    assert (c >= balances[_to]);
    balances[_to] = c;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);

    assert(_value <= balances[_from]);
    balances[_from] -= _value;

    uint256 c = balances[_to] + _value;
    assert (c >= balances[_to]);
    balances[_to] += _value;

    assert(_value <= allowed[_from][msg.sender]);
    allowed[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256) {
    return allowed[_owner][_spender];
  }

  function increaseApproval(address _spender, uint _addedValue) public returns (bool) {
    uint256 c = allowed[msg.sender][_spender] + _addedValue;
    assert (c >= allowed[msg.sender][_spender]);
    allowed[msg.sender][_spender] += _addedValue;

    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  function decreaseApproval(address _spender, uint _subtractedValue) public returns (bool) {
    uint oldValue = allowed[msg.sender][_spender];
    if (_subtractedValue > oldValue) {
      allowed[msg.sender][_spender] = 0;
    } else {
      assert(_subtractedValue <= oldValue);
      allowed[msg.sender][_spender] = oldValue - _subtractedValue;
    }
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

}
