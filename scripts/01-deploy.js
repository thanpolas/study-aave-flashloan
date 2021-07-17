// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { network } = hre.hardhatArguments;

console.log("target network:", network);

let lendingPoolAddressesProviderAddress;
switch (network) {
  case "mainnet":
  case "mainnet-fork":
  case "localhost": // For Ganache mainnet forks
    lendingPoolAddressesProviderAddress =
      // "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; // old address
      "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5"; // kovan address
    break;
  case "ropsten":
  case "ropsten-fork":
    lendingPoolAddressesProviderAddress =
      "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728";
    break;
  case "kovan":
  case "kovan-fork":
    lendingPoolAddressesProviderAddress =
      "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";
    break;
  default:
    throw Error(
      `Are you deploying to the correct network? (network selected: ${network})`
    );
}

// AAVE Lending Pool
const AAVE_LENDING_POOL = lendingPoolAddressesProviderAddress;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("FlashloanV2");
  const contract = await Contract.deploy(AAVE_LENDING_POOL);

  await contract.deployed();

  console.log("AAVE Flash Loan Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
