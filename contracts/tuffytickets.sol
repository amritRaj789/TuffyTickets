// SPDX-License Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TuffyTickets is ERC721 {
    address public owner; // the developer in our case
    uint256 public totalOccasions; // counter for number of Occasions

    struct Occasion { // we cannot name a variable as Event in Solidity as it is a reserved keyword
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) occasions;

    constructor(
        string memory _name,
         string memory _symbol
         ) ERC721(_name, _symbol) { // special function that runs only once whenever smartcontract is created
            owner = msg.sender; // msg.sender is the adress of the person who is calling the constructor
    }

    function list(
        string memory _name, // event time
        uint256 _cost, // ticket cost
        uint256 _maxTickets, // max num to be sold for that event
        string memory _date, // event date
        string memory _time, // event time
        string memory _location // event location
        ) public{
            totalOccasions += 1;

            occasions[totalOccasions] = Occasion(
                totalOccasions,
                _name,
                _cost,
                _maxTickets,
                _maxTickets,
                _date,
                _time,
                _location
            );

    }
}

