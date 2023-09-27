const {expect} = require("chai");
const { ethers } = require("hardhat");
//const { ethers } = require("hardhat");

const NAME = "TuffyTickets";
const SYMBOL = "TT";

describe("TuffyTickets", () => {
    
    // this is longer way which adds redundancy
    /*describe("Deployment", () => { 
        it("Sets the name", async() => { // sets the name of the contract
            const TuffyTickets = await ethers.getContractFactory("TuffyTickets")
            let tuffyTickets = await TuffyTickets.deploy("TuffyTickets", "TT")
            let name = await tuffyTickets.name();
            expect(name).to.equal("TuffyTickets")
        })
        it("Sets the symbol", async() => { // sets the name of the contract
            const TuffyTickets = await ethers.getContractFactory("TuffyTickets")
            let tuffyTickets = await TuffyTickets.deploy("TuffyTickets", "TT")
            let symbol = await tuffyTickets.symbol();
            expect(symbol).to.equal("TT")
        })
    })*/

    //shorter way is this
    let TuffyTickets
    let deployer, buyer;

    beforeEach(async() => {
        // setup accounts
        [deployer, buyer] = await ethers.getSigners();
        const TuffyTickets = await ethers.getContractFactory("TuffyTickets");
        tuffyTickets = await TuffyTickets.deploy(NAME, SYMBOL)
    })

    describe("Deployment", () => { 
        it("Sets the name", async() => { // sets the name of the contract
            let name = await tuffyTickets.name();
            expect(name).to.equal(NAME)
        })
        it("Sets the symbol", async() => { // sets the name of the contract
            let symbol = await tuffyTickets.symbol();
            expect(symbol).to.equal(SYMBOL)
        })
    })


})
