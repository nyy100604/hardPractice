require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
const { vars } = require("hardhat/config");

const INFURA_API_KEY = vars.get("INFURA_API_KEY");

const PRIVATE_KEY = vars.get("PRIVATE_KEY");

module.exports = {
  solidity: "0.8.24",
  networks: {
    holesky: {
      url: `https://holesky.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
