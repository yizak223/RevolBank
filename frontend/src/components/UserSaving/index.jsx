import React from 'react'
import styles from './UserSaving.module.css'

export default function UserSaving() {
    return (
        <>
            <div className={styles.mySavingTitle}>
                <h2>My Saving</h2>
                <p className={styles.seeAll}>see all</p>
            </div>
            <div className={styles.mySavingContainer}>
                <div className={styles.titleSaving}>
                    <div className={styles.containIcon}>
                    <i  className="fa-solid fa-desktop"></i>
                    </div>
                    <h2 className={styles.h2}>My Dream Pc</h2>
                </div>
                <div className={styles.progress}>
                </div>
                <div className={styles.prgressNumber}>
                    <p>0</p>
                    <p>$ 5,000</p>
                </div>
            </div>

            {/* <div className={styles.mySavingContainer}>
                <div className={styles.titleSaving}>
                    <div className={styles.containIcon}>
                    <i className="fa-solid fa-car"></i>
                    </div>
                    <h2 className={styles.h2}>Car Part</h2>
                </div>
                <div className={styles.progress}>
                </div>
                <div className={styles.prgressNumber}>
                    <p>0</p>
                    <p>$ 30,000</p>
                </div>
            </div> */}
        </>
    )
}
