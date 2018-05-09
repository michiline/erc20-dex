pragma solidity ^0.4.18;

import "./ERC20Interface.sol";

contract ERC20Swap {

  struct Swap {
    uint256 openValue;
    address openTrader;
    address openContractAddress;
    uint256 closeValue;
    address closeContractAddress;
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

  function open(bytes32 _swapID, uint256 _openValue, address _openContractAddress, uint256 _closeValue, address _closeContractAddress) public onlyInvalidSwaps(_swapID) {
    // Transfer value from the opening trader to this contract.
    ERC20Interface openERC20Contract = ERC20Interface(_openContractAddress);
    require(_openValue <= openERC20Contract.allowance(msg.sender, address(this)));
    require(openERC20Contract.transferFrom(msg.sender, address(this), _openValue));

    // Store the details of the swap.
    Swap memory swap = Swap({
      openValue: _openValue,
      openTrader: msg.sender,
      openContractAddress: _openContractAddress,
      closeValue: _closeValue,
      closeContractAddress: _closeContractAddress
    });
    swaps[_swapID] = swap;
    swapStates[_swapID] = States.OPEN;

    emit Open(_swapID);
  }

  function close(bytes32 _swapID) public onlyOpenSwaps(_swapID) {
    // Close the swap.
    Swap memory swap = swaps[_swapID];
    swapStates[_swapID] = States.CLOSED;

    // Transfer the closing funds from the closing trader to the opening trader.
    ERC20Interface closeERC20Contract = ERC20Interface(swap.closeContractAddress);
    require(swap.closeValue <= closeERC20Contract.allowance(msg.sender, address(this)));
    require(closeERC20Contract.transferFrom(msg.sender, swap.openTrader, swap.closeValue));

    // Transfer the opening funds from this contract to the closing trader.
    ERC20Interface openERC20Contract = ERC20Interface(swap.openContractAddress);
    require(openERC20Contract.transfer(msg.sender, swap.openValue));

    emit Close(_swapID);
  }

  function expire(bytes32 _swapID) public onlyOpenSwaps(_swapID) {
    // Expire the swap.
    Swap memory swap = swaps[_swapID];
    swapStates[_swapID] = States.EXPIRED;

    // Transfer opening value from this contract back to the opening trader.
    ERC20Interface openERC20Contract = ERC20Interface(swap.openContractAddress);
    require(openERC20Contract.transfer(swap.openTrader, swap.openValue));

    emit Expire(_swapID);
  }

  function check(bytes32 _swapID) public view returns (uint256 openValue, address openContractAddress, uint256 closeValue, address closeContractAddress) {
    Swap memory swap = swaps[_swapID];
    return (swap.openValue, swap.openContractAddress, swap.closeValue, swap.closeContractAddress);
  }
}
