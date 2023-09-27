// SPDX-License Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TuffyTickets is ERC721 {
    address public owner; // the developer in our case

    constructor(
        string memory _name,
         string memory _symbol
         ) ERC721(_name, _symbol) { // special function that runs only once whenever smartcontract is created
            owner = msg.sender; // msg.sender is the adress of the person who is calling the constructor
    }

}

