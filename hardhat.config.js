require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const { env } = process;

const privateKey = env.ACCOUNT_PRIVATE_KEY;
const endpointInfuraUrl = env.INFURA_ENDPOINT;
const mainnetUrl = env.MAINNET_ALCHEMY;

// Local development Accounts
const LOCAL_ACCOUNT_1 = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
const LOCAL_PRIV_1 =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

module.exports = {
  solidity: '0.8.0',
  defaultNetwork: 'kovan',
  networks: {
    hardhat: {
      forking: {
        url: mainnetUrl,
        blockNumber: 12845039,
      },
      from: LOCAL_ACCOUNT_1,
      accounts: [
        {
          privateKey: LOCAL_PRIV_1,
          balance: String(1e20),
        },
      ],
    },
    kovan: {
      from: '0x5AEB7d3aAe835b15f3f670cD70eFEeCc181123ba',
      url: endpointInfuraUrl,
      accounts: [privateKey],
    },
  },
  paths: {
    // sources: "./contracts",
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};
