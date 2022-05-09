# Bridge between EGLD network(Elrond) AND HARMONY (ONE NETWORK)


## Proof of concept 
1. Develop a minimum viable product MVP so that a bridge between the two networks is feasible.
2. Launch testnet details<br />
    2.1. ELROND testnet smartcontract: https://testnet-explorer.elrond.com/accounts/erd1qqqqqqqqqqqqqpgqsv7ggfdlcgyf8frmffxs5ptrdnsr3cppyfjshxxgrl <br />
    2.2. HARMONY testnet smart contract: https://explorer.testnet.harmony.one/address/0x25b06d69b9badbf99219b3fdf126a66dc40f835d?activeTab=3 <br />
3. Launch mainnet details<br />
    3.1. ELROND mainnet smartcontract: https://explorer.elrond.com/accounts/erd1qqqqqqqqqqqqqpgq03s6pnapp0sh86h6wfpau234zarz05093zms7pfxuj <br />
    3.2. HARMONY mainnet smart contract: https://explorer.harmony.one/address/0xd3291787234fca22eaa90d496d3cb718e51656c5 <br />
<br />
...

## For local deployment
1. Deploy elrond smart contract 
    Use Elrond Workspace explorer and install erdpy<br />
    After installing erdpy<br />
1.1. erdpy contract build
1.2. erdpy contract deploy
    Copy the newly generated contract address to frontend/src/src_egld/config.tsx the field contractAddressEGLD<br />
2. Deploy harmony smart contract
    You can use remix for simplicity. remix.ethereum.org<br />
    copy paste the code from hrc/contracts/HRC_EGLD.sol into a new file<br />
    compile and deploy <br />
    Copy the newly generated contract address to frontend/src/src_hrc/pages/Dashboard/Wallet/Wallet.js the field contractAddress<br />
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



## Future development:
v0.0.1 testnet Proof of feasible (works with an admin administrator/deployer/owner of contract)[Done]<br />
...<br />
...<br />
...<br />
v0.1.0 mainnet Proof of feasible (works with an admin administrator/deployer/owner of contract)[Work in Progress]<br />
...<br />
...<br />
...<br />
v1.0.0 Bridge using zk technology no admin needed (works with trustless technology)<br />
...<br />
...<br />
[TO BE PLAN]<br />
...<br />

## Thank you note
This project was build with the help ok zku.one (zero knowledge university) and special thanks for the mentors helps.
Open project that help for realizing this project were:
1. https://github.com/ElrondNetwork/dapp-template - for ui over elrond network
2. https://github.com/ElrondNetwork/ping-pong-smart-contract - for contract build  over elrond network
3. https://github.com/mikec3/my_tutorials/tree/master/simple_storage - for UI over Harmony network
4. Vercel for UI deployment: https://testnet-admin-egldhmy-bridge.vercel.app/ 
5. Production testnet github repo: https://github.com/constantinp2022/testnet-admin-egldhmy-bridge
6. Vercel for UI deployment: https://egldhmy-bridge-v0-0-2.vercel.app/
7. Mainnet github production: https://github.com/constantinp2022/egldhmy-bridge-v0.0.2
