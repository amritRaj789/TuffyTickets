// SPDX-License Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TuffyTickets is ERC721 {

    constructor(
        string memory _name,
         string memory _symbol
         ) ERC721(_name, _symbol) { // special function that runs only once whenever smartcontract is created
        
    }

}

