// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HRC_EGLD is ERC20 {

    uint256 totalMintedAmount;
    address owner;

    constructor() ERC20("Wrapped EGLD", "wEGLD")
    {
        totalMintedAmount = 0;
        owner = msg.sender;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function mint(address account, uint256 amount) public{

        require(msg.sender == owner, "Only the owner can mint new tokens");
        totalMintedAmount = totalMintedAmount + amount;
        _mint(account, amount);
    }

    function burn(address account, uint256 amount)  public  {
        totalMintedAmount = totalMintedAmount - amount;
        _burn(account, amount);
    }

    function getTotalMintedAmount()  public view  returns (uint256) 
    {
        return totalMintedAmount;
    }
}