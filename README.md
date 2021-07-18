# AAVE Flash Loans Study

> Based on https://github.com/PatrickAlphaC/aave-flashloan-mix and his [youtube video][youtube]

## Instalation and Build

-   Package Uses [Hardhat][hardhat]

### 1. Install Dependencies

```sh
npm i
```

### 2. Copy And Populate .env

Copy `.env_sample` to `.env`

```
cp .env_sample .env
```

-   Open and edit `.env` with your values.

### 3. Compile the Contracts

```sh
npx hardhat compile
```

### 4. Deploy the Contracts on Kovan

Kovan is the default network

```sh
npx hardhat run scripts/01-deploy.js --network kovan
```

### 5. Copy The Deployed Address to .env

You will see the address the contract has been deployed at. Copy that and paste
it on the `.env` file, in the environment variable named `CONTRACT_DEPLOYED_ADDRESS`.

### 6. Run the FlashLoan Contract

```sh
npx hardhat run scripts/02-run-flashloan.js --network kovan
```

[youtube]: https://www.youtube.com/watch?v=Aw7yvGFtOvI
[hardhat]: https://hardhat.org/
