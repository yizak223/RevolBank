import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentTransaction.module.css'
import axios from 'axios';
import { UserContext } from '../../context/User';
import baseUrl from '../../config/BaseUrl';
import { AccountContext } from '../../context/Account';
import Transaction from './transaction';

export default function RecentTransaction() {
    const { token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)
    const [transfers, setTransfers] = useState([])

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.accounts[0].transactions);
            setTransfers(res.data.accounts[0].transactions)
            console.log({ transfers });
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [token, choosenAccount])

    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Recent Transaction</h2>
                <p className={styles.seeAll}>see all</p>
            </div>
            {transfers?.map((transfer, i) => (
                <Transaction transfer={transfer} token={token}/>
            ))}
        </>
    )
}
