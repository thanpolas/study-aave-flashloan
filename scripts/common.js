/**
 * @fileoverview Common functions.
 */

const hre = require('hardhat');

const aaveLendingPoolProviderAbi = require('./abi/aave-lending-Pool-provider-v2.abi.json');

const { ethers } = hre;
const { network } = hre.hardhatArguments;

const script = (module.exports = {});

script.getAaveLendingPoolProvider = (networkStr) => {
  let aavePoolProvider;
  let wethAddress;
  switch (networkStr) {
    case 'mainnet':
    case 'mainnet-fork':
    case 'localhost': // For mainnet forks
      aavePoolProvider = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';
      wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
      break;
    case 'kovan':
    case 'kovan-fork':
      aavePoolProvider = '0x88757f2f99175387ab4c6a4b3067c77a695b0349';
      wethAddress = '0xd0a1e359811322d97991e03f863a0c30c2cf029c';
      break;
    default:
      throw Error(
        `Are you deploying to the correct network? (network selected: ${networkStr})`,
      );
  }

  return {
    aavePoolProvider,
    wethAddress,
  };
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
