import React, { useEffect, useState } from 'react'
import styles from './CoinsAndShare.module.css'

export default function CoinsAndShare() {
    const [shekel, setShekel] = useState(0)
    const [dollar, setDollar] = useState(0)
    const [yen, setYen] = useState(0)

    const fetchFinance = async () => {
        fetch(`https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?sort=-record_date`)
            .then(res => res.json())
            .then((currency) => {
                console.log(currency);
                setShekel(currency.data[73])
                setDollar(currency.data[13])
                setYen(currency.data[75])
                console.log(currency.data[13]);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
      fetchFinance();
    
    }, [])
    
    return (
        <>
            <div className={`${styles.CoinsAndShareContainer} ${styles.CoinsAndShare}`}>
                <h2>Shares & Coins</h2>
            </div>
            <div className={styles.CoinsAndShareContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.icon}>
                        <i class="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.coin}>Shekel</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.howMuch} ${styles.red}`}>{} </p>
                </div>
            </div>
        </>
    )
}
