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
    ropsten:{
      from: '0x260523e0F597f3ce69d363c406596250aedBf25B',
      provider: new HDWalletProvider('84B85742CDF30A2B3492583E29E150D669017CEF34B2A986B6E5A1EE5FD41017', "https://ropsten.infura.io/v3/866c1d6efc4f4b54a6156690c492314c"),
      network_id:3
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
