/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

const { env } = process;
const privateKey = env.ACCOUNT_PRIVATE_KEY;
const endpointInfuraUrl = env.INFURA_ENDPOINT;
const mainnetUrl = env.MAINNET_ALCHEMY;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "kovan",
  networks: {
    hardhat: {
      forking: {
        url: mainnetUrl,
      },
      accounts: [
        {
          privateKey,
          balance: String(10e16),
        },
      ],
    },
    kovan: {
      from: "0x5AEB7d3aAe835b15f3f670cD70eFEeCc181123ba",
      url: endpointInfuraUrl,
      accounts: [privateKey],
    },
  },
  paths: {
    // sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
