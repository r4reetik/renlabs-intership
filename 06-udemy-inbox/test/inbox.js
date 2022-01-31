const { expect, use } = require("chai");
const should = require("chai").should();

describe("Inbox contract", () => {
    let Inbox, inbox;

    beforeEach(async () => {
        Inbox = await ethers.getContractFactory("Inbox");
        inbox = await Inbox.deploy("Hello!");
    });

    describe("Deployment", () => {
        it("should successfully deployed", async () => {
            should.exist(inbox);
        });

        it("has a default message", async () => {
            const defaultMessage = await inbox._message();
            expect(defaultMessage).to.equal("Hello!");
        });
    });

    describe("Functional", () => {
        it("should set message", async () => {
            await inbox.setMessage("Bye!");
            const currMessage = await inbox._message();
            expect(currMessage).to.equal("Bye!");
        });
    });
});
