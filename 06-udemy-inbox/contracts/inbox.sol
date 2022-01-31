// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Inbox {
    string public _message;

    constructor(string memory message) {
        _message = message;
    }

    function setMessage(string memory message) public {
        _message = message;
    }
}