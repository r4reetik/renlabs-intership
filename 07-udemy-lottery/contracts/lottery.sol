// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function lotteryEntry() public payable {
        require(
            msg.value >= 0.001 ether,
            "Paid less than 0.001 ether for entry."
        );

        players.push(msg.sender);
    }

    function randomNumber() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function pickWinner() public {
        require(msg.sender == manager, "Not authorize to pick winner.");
        require(players.length > 0, "No one is playing lottery.");

        uint256 index = randomNumber() % players.length;
        payable(players[index]).transfer(address(this).balance);

        players = new address[](0);
    }
}
