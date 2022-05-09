import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import hrc_token_abi from'../../../contracts/HRC_EGLD.json'
import Interactions from '../Interactions/Interactions';
import UserInteraction from '../Interactions/UserInteraction';

const Wallet = () => {

	let contractAddress = '0xD3291787234fcA22EaA90D496d3CB718E51656C5';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);
	const [transferHash, setTransferHash] = useState(null);



	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toNumber();

		let tokenDecimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

		setBalance(toFixed(tokenBalance));	


	}

   function toFixed(x) {
   if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
         x *= Math.pow(10, e - 1);
         x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
   } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
         e -= 20;
         x /= Math.pow(10, e);
         x += (new Array(e + 1)).join('0');
      }
   }
   return x;
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any Transferrrors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, hrc_token_abi, tempSigner);
		setContract(tempContract);	
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
			updateTokenName();
		}
	}, [contract]);

	const updateTokenName = async () => {
		setTokenName(await contract.name());
	}
	
	return (
		<div className={styles.rectangle}>
			<div>
				<h2> Harmony Mint/Burn</h2>
				<p> Please select Harmony Network before connecting... </p>
				<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
				<br />
				<br />

				<div className={styles.walletCard}> </div>
				<br />
				<br />
				
				<div> <h3> My address: {defaultAccount}</h3> </div>

				<div> <h3>{tokenName} Balance: {balance} </h3> </div>
				<br />
				<br />

				{errorMessage}
				<UserInteraction contract = {contract} address = {defaultAccount} />
				<br />
			</div>
			<Interactions contract = {contract}/>
			<br />
			<button className={styles.button6} onClick={updateBalance}>Refresh Balance</button>
			<br />
		</div>
	)
}

export default Wallet;