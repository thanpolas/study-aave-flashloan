/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

const { env } = process;
const privateKey = env.ACCOUNT_PRIVATE_KEY;
const endpointInfuraUrl = env.INFURA_ENDPOINT;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "kovan",
  networks: {
    hardhat: {
      forking: {
        url: endpointInfuraUrl,
      },
      accounts: [
        {
          privateKey,
          balance: String(10e16),
        },
      ],
    },
    kovan: {
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
