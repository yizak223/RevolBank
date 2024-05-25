import React, { useState, useContext, useEffect } from 'react'
import { AccountContext } from '../../context/Account'
import './CreateTransfer.css'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import styles from './createTrasfer.module.css'

export default function CreateTransfer({ transfers, setTransfers, createTransfer, setCreateTransfer }) {
    const { token } = useContext(UserContext)
    const { choosenAccount, setBalanceuser } = useContext(AccountContext)
    const [accountExist, setAccountExist] = useState(false)
    const [transferState, setTransferState] = useState({
        amount: '',
        from: choosenAccount,
        to: ''
    })
    useEffect(() => {
        transferState.from = choosenAccount?._id
    }, [choosenAccount])
    const handleChange = (e) => {
        transferState[e.target.name] = e.target.value
        setTransferState(transferState)
        console.log(transferState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (choosenAccount?._id == transferState.to) {
            setAccountExist(true)
        } else {
            try {
                const response = await fetch(`${baseUrl}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(transferState)
                })
                const data = await response.json()
                setTransfers([...transfers, data.senderAccount.
                    transactions[data.senderAccount.transactions.length - 1]
                ])
                setBalanceuser(prevBalance => Number(prevBalance.replace(/,/g, "")) - Number(data.newTransaction.amount));
                setBalanceuser(prevBalance => prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                setCreateTransfer(!createTransfer)
                console.log(data)
            } catch (err) {
                console.error('There was a problem with the fetch operation:', err);
                setAccountExist(true)
            }
        }
    }
    return (
        <div className={styles.Container}>
            <h2 className={styles.h2}>Create Transfer</h2>
            <form  className={styles.Form} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.label}>From</label><br />
                    <input className={styles.input} required readOnly name='from' type="text" placeholder="Account number" value={choosenAccount?._id} />
                </div>
                <div>
                    <label className={styles.label}> {accountExist ?
                        `this account doesn't exist`
                        : 'To'}</label><br />

                    <input className={styles.input} required onChange={handleChange} name='to' type="text" placeholder="Account number" />
                </div>
                <div>
                    <label className={styles.label}>Amount</label><br />
                    <input className={styles.input} required onChange={handleChange} name='amount' type="number" placeholder="amount" />
                </div>
                <button className={styles.submitBtn} type="submit">Submit</button>
            </form>
        </div>
    )
}
