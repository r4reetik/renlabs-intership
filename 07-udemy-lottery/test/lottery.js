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
    });

    describe("Winner", () => {
        it("should not be called by user", async () => {
            await expect(lottery.connect(user4).pickWinner()).to.be.revertedWith("Not authorize to pick winner.");
        });

        it("should not pick winner out of zero user", async () => {
            await expect(lottery.pickWinner()).to.be.revertedWith("No one is playing lottery.");
        });
    });
});
