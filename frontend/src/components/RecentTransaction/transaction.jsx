import React, { useEffect, useState } from 'react';
import styles from './RecentTransaction.module.css';
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { formatDateTime2 } from '../../config/dateFormat';

export default function Transaction({ transfer, token }) {
    const [names, setNames] = useState({ nameTo: '', nameFrom: '' });

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const [resNameTo, resNameFrom] = await Promise.all([
                    axios.get(`${baseUrl}/accounts?_id=${transfer.from}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    axios.get(`${baseUrl}/accounts?_id=${transfer.to}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ]);
                setNames({
                    nameTo: resNameTo.data.accounts[0].fullName,
                    nameFrom: resNameFrom.data.accounts[0].fullName
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchNames();
    }, [token, transfer.from, transfer.to]);

    const isExpenditure = transfer.type === 'expenditure';

    return (
        <div className={styles.TransactionContainer}>
            <div className={styles.iconAndType}>
                <div className={styles.iconTran}>
                    <i className="fa-solid fa-money-bill-transfer"></i>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.whereBuy} ${isExpenditure ? styles.expenditure : styles.income}`}>
                        {transfer.type}
                        <span className={styles.tool}>
                            {isExpenditure ? 'Transfer you made' : 'Transfer you received'}
                        </span>
                    </p>
                    <p className={styles.typeBuy}>{isExpenditure ? names.nameFrom : names.nameTo}</p>
                </div>
            </div>
            <div className={styles.amountAndDate}>
                <p className={`${styles.howMuch} ${isExpenditure ? styles.expenditure : styles.income}`}>
                    {isExpenditure ? '-' : '+'} $ {transfer.amount}
                </p>
                <p className={styles.typeBuy}>{formatDateTime2(transfer.createdAt)}</p>
            </div>
        </div>
    );
}
