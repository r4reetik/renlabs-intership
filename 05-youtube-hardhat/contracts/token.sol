// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Token {
    string public name = "Reetik Rajan";
    string public symbol = "R4R";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}
