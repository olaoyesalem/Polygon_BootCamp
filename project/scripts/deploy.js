const { ethers } = require("hardhat");

async function main() {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    console.log("Please Wait deploying.........");
    const helloWorldContract = await helloWorldFactory.deploy("Hello World!");
    await helloWorldContract.deployed();
    // await helloWorldContract.deployed();
    console.log("deployed!!!!");
    console.log(` Contract Deployed To Address :${helloWorldContract.address}`);
}

main()
    .then(() => process.exit(0)) // This is for waiting for the function to finsh and printing any error
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
