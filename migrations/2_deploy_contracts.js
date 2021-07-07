const Contract = artifacts.require("MyV2FlashLoan");

const DEPLOY_ADDRESS = '0x88757f2f99175387aB4C6a4b3067c77A695b0349';

module.exports = function(deployer) {
  deployer.deploy(Contract, DEPLOY_ADDRESS);
};
