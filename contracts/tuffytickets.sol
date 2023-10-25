// SPDX-License-Identifier: UNLICENSED 

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TuffyTickets is ERC721 {
    address public owner; // the developer in our case
    uint256 public totalOccasions; // counter for number of Occasions
    uint256 public totalSupply; // number of NFTs that has been created and exist

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
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken; // this will tell the address of the user who has taken a particular seat
    mapping(uint256 => uint256[]) seatsTaken;
    
    // to add security so that only the dev can create and add events to the smart contract
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

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
        ) public onlyOwner{
    
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


    function mint(uint256 _id, uint256 _seat) public payable{ // we must have a payable modifier here so one can send cryptocurrency
        require(_id != 0); // require _id is not 0
        require(_id <= totalOccasions); // require _id is not less than total occasions...

        // Require that ETH sent is greater than cost
        require(msg.value >= occasions[_id].cost);

        // Require seat is not taken and the seat exists...
        require(seatTaken[_id][_seat] == address(0));
        require(_seat <= occasions[_id].maxTickets);

        occasions[_id].tickets -= 1; // decrease the number of available seats or max tickets for that event
        
        hasBought[_id][msg.sender] = true; // update buying status
        seatTaken[_id][_seat] = msg.sender; // assign seat
        
        seatsTaken[_id].push(_seat); // updates seats currently taken
        
        totalSupply++; // we want to increase the supply count every time this function is called
        
        _safeMint(msg.sender, totalSupply);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory){
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory){
        return seatsTaken[_id]; // reads the true or false status from the array
    }
}

