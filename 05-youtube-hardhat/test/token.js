const { expect } = require("chai");

describe("Token contract", () => {
    let Token, token, owner, addr1, addr2;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        it("should set right owner", async () => {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("should supply to owner", async () => {
            const ownerBalance = await token.getBalance(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transaction", () => {
        it("should transfer owner -> account1", async () => {
            await token.transfer(addr1.address, 100);
            const addr1Balance = await token.getBalance(addr1.address);
            const ownerBalance = await token.getBalance(owner.address);
            expect(addr1Balance).to.equal(100);
            expect(ownerBalance).to.equal((await token.totalSupply()) - 100);
        });

        it("should transfer account1 -> account2", async () => {
            await token.transfer(addr1.address, 100);
            await token.connect(addr1).transfer(addr2.address, 80);
            const addr1Balance = await token.getBalance(addr1.address);
            const addr2Balance = await token.getBalance(addr2.address);
            const ownerBalance = await token.getBalance(owner.address);
            expect(addr1Balance).to.equal(20);
            expect(addr2Balance).to.equal(80);
            expect(ownerBalance).to.equal((await token.totalSupply()) - 100);
        });

        it("should have enough tokens", async () => {
            const initialOwnerBalance = await token.getBalance(owner.address);
            await expect(token.connect(addr1).transfer(owner.address, 12)).to.be.revertedWith("not enough tokens");
            expect(await token.getBalance(owner.address)).to.equal(initialOwnerBalance);
        });
    });
});
