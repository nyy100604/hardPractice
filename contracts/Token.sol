// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Token {
    string public name = "HToken";
    string public symbol = "HT";
    uint public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        console.log(
            "Transferring from %s to %s %s tokens",
            msg.sender,
            to,
            amount
        );
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        console.log("%s's balance is %s", account, balances[account]);
        return balances[account];
    }
}
