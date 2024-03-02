import React from 'react'
import styles from './RecentTransaction.module.css'

export default function RecentTransaction() {
    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Recent Transaction</h2>
                <p className={styles.seeAll}>see all</p>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <div className={styles.type}>
                    <p className={styles.whereBuy}>Rami-Levi</p>
                        <p className={styles.typeBuy}>Shopping</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Rami-Levi</p>
                        <p className={styles.typeBuy}>Shopping</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <div className={styles.type}>
                    <p className={styles.whereBuy}>Rami-Levi</p>
                        <p className={styles.typeBuy}>Shopping</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            {/* <div className={styles.TransactionContainer}></div>
            <div className={styles.TransactionContainer}></div> */}
        </>
    )
}
