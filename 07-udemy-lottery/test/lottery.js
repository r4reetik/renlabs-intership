const { expect, use } = require("chai");

describe("Lottery contract", () => {
    let Lottery, lottery, manager, user1, user2, user3, user4;

    beforeEach(async () => {
        Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();
        [manager, user1, user2, user3, user4, _] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        it("should set manager", async () => {
            expect(await lottery.manager()).to.equal(manager.address);
        });
    });

    describe("Entry", () => {
        it("should not take entry with low ether deposit", async () => {
            await expect(
                lottery.connect(user1).lotteryEntry({ value: ethers.utils.parseEther("0.000634") })
            ).to.be.revertedWith("Paid less than 0.001 ether for entry.");
        });

        it("should take single player entry", async () => {
            await lottery.connect(user1).lotteryEntry({ value: ethers.utils.parseEther("0.002") });
            const players = await lottery.getPlayers();
            expect(players[0]).to.equal(user1.address);
            expect(players.length).to.equal(1);
        });

        it("should take multiple players entry", async () => {
            await lottery.connect(user1).lotteryEntry({ value: ethers.utils.parseEther("0.002") });
            await lottery.connect(user2).lotteryEntry({ value: ethers.utils.parseEther("0.004") });
            await lottery.connect(user3).lotteryEntry({ value: ethers.utils.parseEther("0.003") });
            await lottery.connect(user4).lotteryEntry({ value: ethers.utils.parseEther("0.008") });
            const players = await lottery.getPlayers();
            expect(players[0]).to.equal(user1.address);
            expect(players[1]).to.equal(user2.address);
            expect(players[2]).to.equal(user3.address);
            expect(players[3]).to.equal(user4.address);
            expect(players.length).to.equal(4);
        });
    });

    describe("Winner", () => {
        it("should not be called by user", async () => {
            await expect(lottery.connect(user4).pickWinner()).to.be.revertedWith("Not authorize to pick winner.");
        });

        it("should not pick winner out of zero user", async () => {
            await expect(lottery.pickWinner()).to.be.revertedWith("No one is playing lottery.");
        });

        it("should transfer prizepool to winner", async () => {
            await lottery.connect(user4).lotteryEntry({ value: ethers.utils.parseEther("2.2") });
            const initBalance = await user4.getBalance();
            await lottery.pickWinner();
            const currBalance = await user4.getBalance();
            expect(currBalance - initBalance).to.greaterThan(1.8);
        });

        it("should reset on winning", async () => {
            await lottery.connect(user3).lotteryEntry({ value: ethers.utils.parseEther("0.005") });
            await lottery.pickWinner();
            const players = await lottery.getPlayers();
            expect(players.length).to.equal(0);
        });
    });
});
