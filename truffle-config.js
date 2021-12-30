const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname,"client/src/contracts"),

  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    development: {
      network_id: "*",
      host: "localhost",
      port:8545,
      gas: 6721975,
      gasPrice: 20000000000
    }
  },

  compilers: {
    solc: {
      version: "0.4.17",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
