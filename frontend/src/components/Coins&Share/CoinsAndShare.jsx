import React, { useEffect, useState } from 'react'
import styles from './CoinsAndShare.module.css'
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";

import formatNumberWithCommas from '../../utils/formatNumberWithCommas';

export default function CoinsAndShare() {
    const [tether, setTether] = useState(0)
    const [bitcoin, setbitcoin] = useState(0)
    const [ethereum, setethereum] = useState(0)


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
                setTether(data.data[2].priceUsd)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchFunct();
    }, [])

    return (
        <>
            <div className={`${styles.CoinsAndShareContainer} ${styles.CoinsAndShare}`}>
                <h2 className={styles.h2}>Currencies</h2>
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
                    <p className={`${styles.howMuch} ${styles.red}`}>{formatNumberWithCommas(bitcoin).substring(0, 6)} </p>
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
                    <p className={`${styles.howMuch} ${styles.red}`}>{formatNumberWithCommas(ethereum).substring(0, 5)} </p>
                </div>
            </div>
            <div className={styles.CoinsAndShareContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.icon}>
                    <SiTether />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.coin}>Tehther</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.howMuch} ${styles.red}`}>{formatNumberWithCommas(tether).substring(0, 5)} </p>
                </div>
            </div>
        </>
    )
}
