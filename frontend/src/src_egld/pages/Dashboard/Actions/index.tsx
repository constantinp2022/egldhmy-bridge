
import * as React from 'react';
import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contractAddressEGLD } from '../../../config';


let { bech32, bech32m } = require('bech32');

const Actions = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const [hasDeposit, setHasDeposit] = React.useState<boolean>();
  const [receiverAddress, setReceiverAddress] = React.useState<string>("");
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractAddressEGLD),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setHasDeposit(true);
            break;
          case '':
            setHasDeposit(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setHasDeposit(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  const { sendTransactions } = transactionServices;

  const sendDepositTransaction = async () => {
    const depositTransaction = {
      value: '10000000000000000',
      data: 'deposit',
      receiver: contractAddressEGLD
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: depositTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Deposit transaction',
        errorMessage: 'An error has occurred during Deposit',
        successMessage: 'Deposit transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendWithdrawTransaction = async () => {

    let mybech32address = new Address(receiverAddress).hex()

    const withdrawTransaction = {
      value: '0',
      data: 'withdraw@' + mybech32address,
      receiver: contractAddressEGLD
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: withdrawTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Withdraw transaction',
        errorMessage: 'An error has occured during Withdraw',
        successMessage: 'Withdraw transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  function getData(val: any){
    setReceiverAddress((val.target.value));
    console.warn(val.target.value);
  }

  return (
    <div className='d-flex mt-4 justify-content-center'>
      <div className='action-btn' onClick={sendDepositTransaction}>
        <button className='btn'>
          <FontAwesomeIcon icon={faArrowUp} className='text-primary' />
        </button>
        <a href='/' className='text-white text-decoration-none'>
          Deposit
        </a>
      </div>
      <br />
      <input type='text' id='receiverAddress' onChange={getData} className="receiverAddress"/>
      <div className='action-btn' onClick={sendWithdrawTransaction}>
        <button className='btn'>
          <FontAwesomeIcon icon={faArrowDown} className='text-primary' />
        </button>
        <a href='/' className='text-white text-decoration-none'>
          Withdraw
        </a>
      </div>
    </div>
  );
};

export default Actions;
