import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentTransaction.module.css'
import axios from 'axios';
import { UserContext } from '../../context/User';
import baseUrl from '../../config/BaseUrl';
import { AccountContext } from '../../context/Account';
import Transaction from './transaction';
import { useNavigate } from 'react-router-dom';

export default function RecentTransaction() {
    const { token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)
    const [transfers, setTransfers] = useState([])
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTransfers(res.data.accounts[0].transactions)
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err)
        }
    }

    const goActivities = () => {
        navigate('/balances')
    }

    useEffect(() => {
        fetchData()
    }, [token, choosenAccount])

    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Recent Transaction</h2>
                <p onClick={goActivities} className={styles.seeAll}>see all</p>
            </div>
            {
                transfers.length != 0 ?
                    transfers?.map((transfer, i) => (
                        <Transaction key={i} transfer={transfer} token={token} />
                    ))
                    : 
                    <div className={styles.noTransaction}>
                        <h2>No recent transaction</h2>
                    </div>
            }

        </>
    )
}
