import React from 'react'
import styles from './totalSpend.module.css'
import { CiShoppingBasket } from "react-icons/ci";
import { GrCafeteria } from "react-icons/gr";
import { GiIsland } from "react-icons/gi";
import { GiMusicSpell } from "react-icons/gi";

export default function TotalSpend() {
    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Total Amount</h2>
                {/* <p className={styles.seeAll}>see all</p> */}
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <CiShoppingBasket  className={styles.reactIcon}/>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Transfer income</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i class="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Transfer outcome</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                    <GrCafeteria  className={styles.reactIcon}/>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>loans</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            {/* <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                    <GiIsland  className={styles.reactIcon}/>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Vacation</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                    <GiMusicSpell  className={styles.reactIcon}/>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Entertaiment</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div> */}
        </>
    )
}
