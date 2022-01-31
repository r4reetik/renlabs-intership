const fs = require("fs");

const main = async () => {
    const [deployer, _] = await ethers.getSigners();
    console.log(`Deployed by : ${deployer}`);

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    console.log(`Deployed at : ${lottery.address}`);

    const data = {
        address: lottery.address,
        abi: JSON.parse(lottery.interface.format("json")),
    };
    fs.writeFileSync("dev/contract.json", JSON.stringify(data));
};

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
