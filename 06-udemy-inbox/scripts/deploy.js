const fs = require("fs");

const main = async () => {
    const [deployer, _] = await ethers.getSigners();
    console.log(`Deployed by : ${deployer}`);

    const Inbox = await ethers.getContractFactory("Inbox");
    const inbox = await Inbox.deploy("Hello!");

    console.log(`Deployed at : ${inbox.address}`);

    const data = {
        address: inbox.address,
        abi: JSON.parse(inbox.interface.format("json")),
    };
    fs.writeFileSync("dev/contract.json", JSON.stringify(data));
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
