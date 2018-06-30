pragma solidity ^0.4.18;

import "./ERC20Interface.sol";

contract ERC20Swap {

  struct Swap {
    address makerAddress;
    uint256 initialAmountA;
    uint256 initialAmountB;
    uint256 remainingAmountA;
    uint256 remainingAmountB;
    address addressA;
    address addressB;
  }

  enum States {
    INVALID,
    OPEN,
    CLOSED,
    EXPIRED
  }

  mapping (bytes32 => Swap) private swaps;
  mapping (bytes32 => States) private swapStates;

  event Open(bytes32 _swapID);
  event Fill(bytes32 _swapID);
  event Expire(bytes32 _swapID);
  event Close(bytes32 _swapID);

  modifier onlyInvalidSwaps(bytes32 _swapID) {
    require (swapStates[_swapID] == States.INVALID);
    _;
  }

  modifier onlyOpenSwaps(bytes32 _swapID) {
    require (swapStates[_swapID] == States.OPEN);
    _;
  }

  function open(bytes32 _swapID, uint256 _initialAmountA, uint256 _initialAmountB, address _addressA, address _addressB) public onlyInvalidSwaps(_swapID) {
    // Transfer amount from the opening trader to this contract.
    ERC20Interface openERC20Contract = ERC20Interface(_addressA);
    require(_initialAmountA <= openERC20Contract.allowance(msg.sender, address(this)));
    require(openERC20Contract.transferFrom(msg.sender, address(this), _initialAmountA));

    // Store the details of the swap.
    Swap memory swap = Swap({
      makerAddress: msg.sender,
      initialAmountA: _initialAmountA,
      initialAmountB: _initialAmountB,
      remainingAmountA: _initialAmountA,
      remainingAmountB: _initialAmountB,
      addressA: _addressA,
      addressB: _addressB
    });
    swaps[_swapID] = swap;
    swapStates[_swapID] = States.OPEN;

    emit Open(_swapID);
  }

  function fill(bytes32 _swapID, uint256 _fillAmountB) public onlyOpenSwaps(_swapID) {
    Swap memory swap = swaps[_swapID];

    uint256 amountTokenA;
    uint256 amountTokenB;
    // if it fills the remaining amount completely
    if (swap.remainingAmountB <= _fillAmountB) {
       amountTokenB = swap.remainingAmountB;
       amountTokenA = swap.remainingAmountA;
       swap.remainingAmountB = 0;
       swap.remainingAmountA = 0;
    } else {
      assert(_fillAmountB <= swap.remainingAmountB);
      // check because of non integer division
      if (swap.remainingAmountA > swap.remainingAmountB) {
        uint256 rate1 = swap.remainingAmountA / swap.remainingAmountB;
        amountTokenB = _fillAmountB;
        if (amountTokenB == 0) {
          amountTokenA = 0;
        }
        uint256 c = amountTokenB * rate1;
        assert(c / amountTokenB == rate1);
        amountTokenA = c;
      } else {
        uint256 rate2 = swap.remainingAmountB / swap.remainingAmountA;
        amountTokenB = _fillAmountB;
        amountTokenA = amountTokenB / rate2;
      }
      swap.remainingAmountA -= amountTokenA;
      swap.remainingAmountB -= amountTokenB;
    }

    // Transfer the closing funds from the closing trader to the opening trader.
    ERC20Interface closeERC20Contract = ERC20Interface(swap.addressB);
    require(amountTokenB <= closeERC20Contract.allowance(msg.sender, address(this)));
    require(closeERC20Contract.transferFrom(msg.sender, swap.makerAddress, amountTokenB));

    // Transfer the opening funds from this contract to the closing trader.
    ERC20Interface openERC20Contract = ERC20Interface(swap.addressA);
    require(openERC20Contract.transfer(msg.sender, amountTokenA));

    if (swap.remainingAmountA == 0) {
      swapStates[_swapID] = States.CLOSED;
      emit Close(_swapID);
    } else {
      swaps[_swapID] = swap;
      emit Fill(_swapID);
    }
  }

  function expire(bytes32 _swapID) public onlyOpenSwaps(_swapID) {
    // Expire the swap.
    Swap memory swap = swaps[_swapID];
    swapStates[_swapID] = States.EXPIRED;

    // Transfer opening amount from this contract back to the opening trader.
    ERC20Interface openERC20Contract = ERC20Interface(swap.addressA);
    require(openERC20Contract.transfer(swap.makerAddress, swap.remainingAmountA));

    emit Expire(_swapID);
  }

  function check(bytes32 _swapID) public view returns (address makerAddress, uint256 initialAmountA, uint256 initialAmountB, uint256 remainingAmountA, uint256 remainingAmountB, address addressA, address addressB) {
    Swap memory swap = swaps[_swapID];
    return (swap.makerAddress, swap.initialAmountA, swap.initialAmountB, swap.remainingAmountA, swap.remainingAmountB, swap.addressA, swap.addressB);
  }
}
