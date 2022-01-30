const fs = require("fs");

const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying with account address : ${deployer.address}`);

    const deployerBalance = await deployer.getBalance();
    console.log(`Deployer balance : ${deployerBalance.toString()}`);

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log(`Contract address : ${token.address}`);

    const data = {
        address: token.address,
        abi: JSON.parse(token.interface.format("json"))
    }
    fs.writeFileSync("dev/contract.json", JSON.stringify(data));
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
