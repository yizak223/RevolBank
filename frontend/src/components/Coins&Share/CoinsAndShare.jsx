import React, { useEffect, useState } from 'react'
import styles from './CoinsAndShare.module.css'
import { FaBitcoin, FaEthereum, FaShekelSign } from "react-icons/fa";
import formatNumberWithCommas from '../../utils/formatNumberWithCommas';

export default function CoinsAndShare() {
    const [shekel, setShekel] = useState(0)
    const [bitcoin, setbitcoin] = useState(0)
    const [ethereum, setethereum] = useState(0)

    const fetchFinance = async () => {
        fetch(`https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?sort=-record_date`)
            .then(res => res.json())
            .then((currency) => {
                setShekel(currency.data[73].exchange_rate)
            })
            .catch((err) => console.error(err));
    };

    const fetchFunct = () => {
        fetch("https://api.coincap.io/v2/assets")
            .then((res) => { return res.json() })
            .then((data) => {
                data.data.map((item, index) => {
                    item.priceUsd = parseFloat(item.priceUsd)
                    item.changePercent24Hr = parseFloat(item.changePercent24Hr)
                    item.marketCapUsd = parseFloat(item.marketCapUsd)
                })
                setbitcoin(data.data[0].priceUsd)
                setethereum(data.data[1].priceUsd)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchFinance();
        fetchFunct();
    }, [])

    return (
        <>
            <div className={`${styles.CoinsAndShareContainer} ${styles.CoinsAndShare}`}>
                <h2>Currencies</h2>
            </div>
            <div className={styles.CoinsAndShareContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.icon}>
                        <FaShekelSign />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.coin}>Shekel</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.howMuch} ${styles.red}`}>{shekel} </p>
                </div>
            </div>
            <div className={styles.CoinsAndShareContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.icon}>
                        <FaBitcoin />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.coin}>Bitcoin</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.howMuch} ${styles.red}`}>{formatNumberWithCommas(bitcoin).substring(0,6)} </p>
                </div>
            </div>
            <div className={styles.CoinsAndShareContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.icon}>
                        <FaEthereum />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.coin}>Ethereum</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.howMuch} ${styles.red}`}>{formatNumberWithCommas(ethereum).substring(0,5)} </p>
                </div>
            </div>
        </>
    )
}
