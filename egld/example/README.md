# Deploy Elrond

##  Prepare the set up
1. Install VSCODE
2. Install Elrond IDE extension
3. Ctrl + Shift + P
4. Elrond Setup Workspace
5. Install erdpy 
6. Restart VSCODE
7. From ELROND WORKSPACE FROM LEFT install a template crowdfunding
8. Ignore the folder mycrowdfunding because is a generated folder for a ELROND Project 
9. For example the mycrowdfunding/src/crowdfunding_esdt.rs is the file that requires attention
10. mycrowdfunding/mandos contains the tests with diferent scanario written in json

## Deploy
1. Does NOT work on WINDOWS
2. you must install erdpy (Elrond SDK)
3. erdpy --verbose deps install rust --overwrite
4. erdpy --verbose deps install vmtools --overwrite
5. erdpy --verbose deps install rust --overwrite


## Deploy on testnet 
1. Create a wallet 
```sh
 erdpy --verbose wallet derive alice.pem --mnemonic
```
2. Use the snippet in the interaction folder to deploy on the testnet after you have got some EGLD from faucet
My transaction : https://testnet-explorer.elrond.com/transactions/938a996aebf63724e5024571305a38b3caabac0630db36a958412d0fa76c7181