const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'evoke ladder reopen shine print alert legal clinic glare aspect crazy can';
const privateKeyTest = '<ADD-YOUR-PRIVATE-KEY-HERE>';

module.exports = {
  networks: {
    testnet: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic,
          providerOrUrl: 'https://api.s0.b.hmny.io', // https://api.s0.t.hmny.io for mainnet
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666700000, // 1666600000 for mainnet
    },
    testnetHar: {
      provider: () => {
        if (!privateKeyTest.trim()) {
          throw new Error(
            'Please enter a private key with funds, you can use the default one'
          );
        }
        return new HDWalletProvider({
          privateKeys: [privateKeyTest],
          providerOrUrl: 'https://api.s0.b.hmny.io',
        });
      },
      network_id: 1666700000,
    },
  },
  compilers: {
     solc: {
       version: "0.8.0" // ex:  "0.4.20". (Default: Truffle's installed solc
     }
  }
};