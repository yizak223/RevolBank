import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AccountContext } from '../../context/Account';
import './CreateTransfer.css';
import baseUrl from '../../config/BaseUrl';
import { UserContext } from '../../context/User';
import styles from './createTrasfer.module.css';

export default function CreateTransfer({ transfers, setTransfers, createTransfer, setCreateTransfer }) {
  const { token } = useContext(UserContext);
  const { choosenAccount, setBalanceuser } = useContext(AccountContext);
  const [accountExist, setAccountExist] = useState(false);
  const [transferState, setTransferState] = useState({
    amount: '',
    from: choosenAccount?._id,
    to: '',
  });

  useEffect(() => {
    setTransferState(prevState => ({
      ...prevState,
      from: choosenAccount?._id,
    }));
  }, [choosenAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const findAccountByNumberAccount = useCallback(async (numberAccount) => {
    try {
      const response = await fetch(`${baseUrl}/accounts?numberAccount=${numberAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return String(data.accounts[0]._id);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
      return null;
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (choosenAccount?._id === transferState.to) {
      setAccountExist(true);
      return;
    }

    try {
      const accountID = await findAccountByNumberAccount(transferState.to);
      if (!accountID) {
        setAccountExist(true);
        return;
      }

      const response = await fetch(`${baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...transferState, to: accountID }),
      });
      const data = await response.json();

      setTransfers(prevTransfers => [
        ...prevTransfers,
        data.senderAccount.transactions[data.senderAccount.transactions.length - 1],
      ]);

      setBalanceuser(prevBalance => {
        const newBalance = Number(prevBalance.replace(/,/g, '')) - Number(data.newTransaction.amount);
        return newBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      });

      setCreateTransfer(!createTransfer);
      setAccountExist(false);
      setTransferState({
        amount: '',
        from: choosenAccount?._id,
        to: '',
      });
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
      setAccountExist(true);
    }
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.h2}>Create Transfer</h2>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>From</label><br />
          <input
            className={styles.input}
            required
            readOnly
            name="from"
            type="text"
            placeholder="Account number"
            value={`${choosenAccount.numberAccount} (${choosenAccount?.fullName})`}
          />
        </div>
        <div>
          <label className={styles.label}>
            {accountExist ? `This account doesn't exist` : 'To'}
          </label><br />
          <input
            className={styles.input}
            required
            onChange={handleChange}
            name="to"
            type="text"
            placeholder="Account number"
          />
        </div>
        <div>
          <label className={styles.label}>Amount</label><br />
          <input
            className={styles.input}
            required
            onChange={handleChange}
            name="amount"
            type="number"
            placeholder="Amount"
          />
        </div>
        <button className={styles.submitBtn} type="submit">Submit</button>
      </form>
    </div>
  );
}
