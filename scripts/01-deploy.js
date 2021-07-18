// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

const { verifyAaveProvider, getAaveLendingPoolProvider } = require('./common');

const { ethers } = hre;

const { network } = hre.hardhatArguments;

console.log('target network:', network);

// AAVE Lending Pool
const { aavePoolProvider } = getAaveLendingPoolProvider(network);

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signer = await ethers.getSigner();

  console.log('signer.address:', signer.address);

  await verifyAaveProvider();

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory('FlashloanV2');
  console.log('Deploying using aavePoolProvider:', aavePoolProvider);
  const contract = await Contract.deploy(aavePoolProvider);

  await contract.deployed();

  console.log('AAVE Flash Loan Contract deployed to:', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
