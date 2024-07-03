import React, { useEffect, useState } from 'react'
import styles from './RecentTransaction.module.css'
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { formatDateTime2 } from '../../config/dateFormat';

export default function Transaction({ transfer, token }) {

    const [nameTo, setNameTo] = useState()
    const [nameFrom, setNameFrom] = useState()

    const fetchNameTo = async () => {
        try {
            const resNameTo = await axios.get(`${baseUrl}/accounts?_id=${transfer.from}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const resNameFrom = await axios.get(`${baseUrl}/accounts?_id=${transfer.to}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setNameTo(resNameTo.data.accounts[0].fullName)
            setNameFrom(resNameFrom.data.accounts[0].fullName)
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchNameTo()
    }, [])

    return (
        <div className={styles.TransactionContainer}>
            <div className={styles.iconAndType}>
                <div className={styles.iconTran}>
                    <i className="fa-solid fa-money-bill-transfer"></i>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.whereBuy} ${transfer.type === 'expenditure' ? styles.expenditure : styles.income}`}>{transfer.type}</p>
                    <p className={styles.typeBuy}>{transfer.type === 'expenditure' ? nameFrom : nameTo}</p>
                </div>
            </div>
            <div className={styles.amountAndDate}>
                <p className={`${styles.howMuch} ${transfer.type === 'expenditure' ? styles.expenditure : styles.income}`}>{transfer.type === 'expenditure' ? '-' : '+'} $ {transfer.amount} </p>
                <p className={styles.typeBuy}>{formatDateTime2(transfer.createdAt)}</p>
            </div>
        </div>
    )
}
