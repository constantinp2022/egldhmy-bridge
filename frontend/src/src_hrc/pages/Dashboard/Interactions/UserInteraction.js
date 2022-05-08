import {React, useState} from 'react'
import styles from '../Wallet/Wallet.module.css';

const Interactions = (props) => {

	const [transferHash, setTransferHash] = useState();

	const mintAmount = 1000000000000000;


	const transferHandler = async (e) => {
		e.preventDefault();
		let transferAmount = mintAmount;

		let txt = await props.contract.burn(props.address, transferAmount);
		console.log(txt);
		setTransferHash("Transfer confirmation hash: " + txt.hash);
	}

	return (
			<div className={styles.interactionsCardUser}>
				<form onSubmit={transferHandler}>
					<h3> User Interface Burn WETH </h3>

						<button type='submit' className={styles.button6}>Burn</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Interactions;