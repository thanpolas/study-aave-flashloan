/**
 * @fileoverview Execute the deployed contract.
 */

require("dotenv").config();
const hre = require("hardhat");
const erc20abi = require("./abi/erc20.abi");

const { env } = process;
const { ethers } = hre;
const KOVAN_WETH = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";

async function main() {
  const artifacts = await hre.artifacts.readArtifact("FlashloanV2");
  const signer = await ethers.getSigner();
  const wethContract = new ethers.Contract(KOVAN_WETH, erc20abi, signer);
  const flashloanContract = new ethers.Contract(
    env.CONTRACT_DEPLOYED_ADDRESS,
    artifacts.abi,
    signer
  );

  const balance = await wethContract.balanceOf(env.CONTRACT_DEPLOYED_ADDRESS);
  const contractBalance = Number(balance);
  const owner = await flashloanContract.owner();
  const ownerBalance = Number(await signer.getBalance());

  console.log("balace of deployed contract:", contractBalance);

  console.log("owner of deployed contract", owner);
  console.log("Your account's address:", signer.address);
  console.log("Your account's balance:", ownerBalance);
  try {
    const tx = await flashloanContract.flashloan(wethContract);
    console.log("blockNumber b4", tx.blockNumber);
    const receipt = await tx.wait();
    console.log("blockNumber", tx.blockNumber);
  } catch (ex) {
    console.error("FAILED TO RUN");
    console.error("reason:", ex.reason);
    console.error("code:", ex.code);
    console.error("argument:", ex.argument);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
