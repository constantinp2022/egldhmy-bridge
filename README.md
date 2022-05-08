# Bridge between EGLD network(Elrond) AND HARMONY (ONE NETWORK)


#Proof of concept 
1. Develop a minimum viable product MVP so that a bridge between the two networks is feasible.
2. Launch testnet details
    2.1. ELROND testnet smartcontract: https://testnet-explorer.elrond.com/accounts/erd1qqqqqqqqqqqqqpgqsv7ggfdlcgyf8frmffxs5ptrdnsr3cppyfjshxxgrl
    2.2. HARMONY testnet smart contract: https://explorer.testnet.harmony.one/address/0x25b06d69b9badbf99219b3fdf126a66dc40f835d?activeTab=3 
3. Launch mainnet details

...

For local deployment
1. Deploy elrond smart contract 
    Use Elrond Workspace explorer and install erdpy
    After installing erdpy
    1.1. erdpy contract build
    1.2. erdpy contract deploy
    Copy the newly generated contract address to frontend/src/src_egld/config.tsx the field contractAddressEGLD
2. Deploy harmony smart contract
    You can use remix for simplicity. remix.ethereum.org
    copy paste the code from hrc/contracts/HRC_EGLD.sol into a new file
    compile and deploy 
    Copy the newly generated contract address to frontend/src/src_hrc/pages/Dashboard/Wallet/Wallet.js the field contractAddress
3. Start the UI interface 
    go to frontend folder
    install all dependencies
    ```sh
    npm install
    ```
    run the server on localhost:3000
    ```sh
    npm run start
    ```



Future development:
v0.0.1 testnet Proof of feasible (works with an admin administrator/deployer/owner of contract)[Done]
...
...
...
v0.1.0 mainnet Proof of feasible (works with an admin administrator/deployer/owner of contract)[Work in Progress]
...
...
...
v1.0.0 Bridge using zk technology no admin needed (works with trustless technology)
...
...
[TO BE PLAN]
...

