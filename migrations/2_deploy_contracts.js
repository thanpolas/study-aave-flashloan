const Contract = artifacts.require("MyV2FlashLoan");

// const DEPLOY_ADDRESS = '0x88757f2f99175387aB4C6a4b3067c77A695b0349';
const DEPLOY_ADDRESS = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';


module.exports = function(deployer) {
  deployer.deploy(Contract, DEPLOY_ADDRESS);
};
