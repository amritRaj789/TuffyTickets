const {expect} = require("chai");

describe("TuffyTickets", () => {
    
    describe("Deployment", () => {
        it("Sets the name", async() => {
            const TuffyTickets = await ethers.getContractFactory("TuffyTickets")
            let tuffyTickets = await TuffyTickets.deploy("TuffyTickets", "TT")
            let name = await tuffyTickets.name();
            expect(name).to.equal("TuffyTickets")
        })
    })
})
