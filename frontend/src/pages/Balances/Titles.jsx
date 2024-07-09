import React from 'react'
import styles from './balnces.module.css'
import styles2 from '../../components/SingleBalance/singleBalance.module.css'

export default function Titles() {
    return (
        <div className={styles.titles}>
            <div className={styles2.containerForMobile}> 
                <h1 className={`${styles.title} ${styles.activeTitle}`}>Date</h1>
                <h1 className={styles.title}>Activity</h1>
            </div>
            <div className={styles2.containerForMobileR}>
                <h1 className={styles.title}>Amount</h1>
                <h1 className={styles.title}>Name</h1>
            </div>
        </div>
    )
}
