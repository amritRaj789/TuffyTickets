const {expect} = require("chai");
const { ethers } = require("hardhat");


const NAME = "TuffyTickets";
const SYMBOL = "TT";

// details for an event

const OCCASION_NAME = "ETH CSUF Concert"
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether')
const OCCASION_MAX_TICKETS = 169
const OCCASION_DATE = "Apr 03"
const OCCASION_TIME = "12:00PM PDT"
const OCCASION_LOCATION = "Santa Ana, California"

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
    let tuffyTickets;
    let deployer, buyer;

    beforeEach(async() => {
        // setup accounts
        [deployer, buyer] = await ethers.getSigners();

        const TuffyTickets = await ethers.getContractFactory("TuffyTickets");
        tuffyTickets = await TuffyTickets.deploy(NAME, SYMBOL)

        const transaction = await tuffyTickets.connect(deployer).list(
            OCCASION_NAME,
            OCCASION_COST,
            OCCASION_MAX_TICKETS,
            OCCASION_DATE,
            OCCASION_TIME,
            OCCASION_LOCATION
        ) // connect specifies the account with which we are doing transactions


        await transaction.wait()
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
        it("Sets the owner", async() => {
            expect(await tuffyTickets.owner()).to.equal(deployer.address) // people usually forget to add the address
        })
    })

    describe("Occasions", () => {
        it("Updates occasions count", async() => {
            const totalOccasions = await tuffyTickets.totalOccasions()
            expect(totalOccasions).to.be.equal(1)
        })

        // test example to update the occasions and check the attributes
        it("Returns occasions attributes", async() => {
            const occasion = await tuffyTickets.getOccasion(1)
            expect(occasion.id).to.be.equal(1)
            expect(occasion.name).to.be.equal(OCCASION_NAME)
            expect(occasion.cost).to.be.equal(OCCASION_COST)
            expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS)
            expect(occasion.date).to.be.equal(OCCASION_DATE)
            expect(occasion.time).to.be.equal(OCCASION_TIME)
            expect(occasion.location).to.be.equal(OCCASION_LOCATION)
        })
    })


})
