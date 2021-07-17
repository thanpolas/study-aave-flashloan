/**
 * @fileoverview Execute the deployed contract.
 */

require('dotenv').config();

const hre = require('hardhat');

const erc20abi = require('./abi/erc20.abi.json');

const { env } = process;
const { ethers } = hre;
const KOVAN_WETH = '0xd0a1e359811322d97991e03f863a0c30c2cf029c';

async function main() {
  const artifacts = await hre.artifacts.readArtifact('FlashloanV2');
  const signer = await ethers.getSigner();
  const wethContract = new ethers.Contract(KOVAN_WETH, erc20abi, signer);
  const flashloanContract = new ethers.Contract(
    env.CONTRACT_DEPLOYED_ADDRESS,
    artifacts.abi,
    signer,
  );

  const balance = await wethContract.balanceOf(env.CONTRACT_DEPLOYED_ADDRESS);
  const contractBalance = Number(balance);
  const signerBalance = Number(await signer.getBalance());
  const owner = await flashloanContract.owner();

  console.log('Deployed contract:', env.CONTRACT_DEPLOYED_ADDRESS);
  console.log('balace of deployed contract:', contractBalance);

  console.log('owner of deployed contract', owner);
  console.log("Signer account's address:", signer.address);
  console.log("Signer account's balance:", signerBalance);
  try {
    if (true || contractBalance === 0) {
      const transferSum = ethers.utils.parseEther('0.01');
      console.log(`Transfering ${transferSum} WETH`);
      const tx = await wethContract.transfer(
        env.CONTRACT_DEPLOYED_ADDRESS,
        transferSum,
      );
      console.log('WETH SENT to contract!', tx);
    }

    const tx = await flashloanContract.flashloan(wethContract.address);
    console.log('blockNumber b4', tx.blockNumber);
    const receipt = await tx.wait();
    console.log('blockNumber', tx.blockNumber);
  } catch (ex) {
    console.error('FAILED TO RUN');
    console.error('Error Name:', ex.name);
    console.error('Error reason:', ex.reason);
    console.error('Error code:', ex.code);
    console.error('Error argument:', ex.argument);
    console.error('Error parent:', ex.parent);
    console.error('Error data:', ex.data);
    console.log('Error Properties:', Object.keys(ex));
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
