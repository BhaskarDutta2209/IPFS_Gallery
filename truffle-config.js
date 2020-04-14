require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require('truffle-hdwallet-provider')
const MNEMONIC = 'run hockey mule december rural feel shoe order weird flag alcohol battle'
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
