// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const aaveLendingPoolProviderAbi = require('./abi/aave-lending-Pool-provider-v2.abi.json');

const { ethers } = hre;

const { network } = hre.hardhatArguments;

console.log('target network:', network);

const script = (module.exports = {});

script.getAaveLendingPoolProvider = (networkStr) => {
  let lendingPoolAddressesProviderAddress;
  switch (networkStr) {
    case 'mainnet':
    case 'mainnet-fork':
    case 'localhost': // For mainnet forks
      lendingPoolAddressesProviderAddress =
        '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';
      break;
    case 'kovan':
    case 'kovan-fork':
      lendingPoolAddressesProviderAddress =
        '0x88757f2f99175387ab4c6a4b3067c77a695b0349';
      break;
    default:
      throw Error(
        `Are you deploying to the correct network? (network selected: ${network})`,
      );
  }

  return lendingPoolAddressesProviderAddress;
};

/**
 * Verify that AAVE LP Provider contract exists and is working.
 *
 * @return {Promise}
 */
script.verifyAaveProvider = async () => {
  const signer = await ethers.getSigner();
  const aaveLendingPoolProviderAddress =
    script.getAaveLendingPoolProvider(network);

  const aaveLendingPoolProviderContract = new ethers.Contract(
    aaveLendingPoolProviderAddress,
    aaveLendingPoolProviderAbi,
    signer,
  );

  console.log(
    'Checking validity of AAVE Lending Pool Provider contract:',
    aaveLendingPoolProviderAddress,
  );

  const aaveProviderMarketId =
    await aaveLendingPoolProviderContract.getMarketId();

  console.log('Validity confirmed, id:', aaveProviderMarketId);
};

// AAVE Lending Pool
const AAVE_LENDING_POOL = script.getAaveLendingPoolProvider(network);

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signer = await ethers.getSigner();

  console.log('signer.address:', signer.address);

  await script.verifyAaveProvider();

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory('FlashloanV2');
  console.log('Deploying using AAVE_LENDING_POOL:', AAVE_LENDING_POOL);
  const contract = await Contract.deploy(AAVE_LENDING_POOL);

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
