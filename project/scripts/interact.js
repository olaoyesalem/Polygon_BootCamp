require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs-extra");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json"); //this is to grab contract abi
//console.log(contract_ABI);
//console.log(JSON.stringify(CONTRACT_ABI.abi));

//provider

const provider = new ethers.providers.AlchemyProvider(
    (network = "goerli"),
    API_KEY
);
//providers.AlchemyProvider("goerli", API_KEY);

//signer(wallet)
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

//contract
const helloworldContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI.abi,
    wallet
); //;//

async function main() {
    // const provider = new ethers.providers.JsonRpcProvider(API_KEY);
    // const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    // const abi = fs.readFileSync("HelloWorld_sol_HelloWorld.abi", "utf8");
    // const binary = fs.readFileSync("HelloWorld_sol_HelloWorld.bin", "utf8");
    // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    // const contract = contractFactory.deploy();
    // console.log("deployedd......");
    // contract.deployed();

    const message = await helloworldContract.message();
    console.log(`The message is ${message}`);

    console.log("Updating Message");
    const updatingMessage = await helloworldContract.update(
        " This is the new message!"
    );
   await updatingMessage.wait();
    const printUpdatedMessage = await helloworldContract.message();
    console.log(`New Message: ${printUpdatedMessage}`);
}
main()
    .then(() => process.exit(0)) // This is for waiting for the function to finsh and printing any error
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
