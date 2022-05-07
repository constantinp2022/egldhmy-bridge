import {React, useState} from 'react'
import styles from '../Wallet/Wallet.module.css';

const Interactions = (props) => {

	const [transferHash, setTransferHash] = useState();

	// const mintAmount = 1000000000000000;
	const mintAmount = 10000;


	const transferHandler = async (e) => {
		e.preventDefault();
		let transferAmount = mintAmount;
		let recieverAddress = e.target.recieverAddress.value;

		let txt = await props.contract.mint(recieverAddress, transferAmount);
		console.log(txt);
		setTransferHash("Transfer confirmation hash: " + txt.hash);
	}

	return (
			<div className={styles.interactionsCard}>
				<form onSubmit={transferHandler}>
					<h3> Admin Interface Mint WETH </h3>
						<p> Reciever Address </p>
						<input type='text' id='recieverAddress' className={styles.addressInput}/>

						<button type='submit' className={styles.button6}>Mint</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Interactions;