import React from 'react'
import styles from './navbar2.module.css'

export default function NavBar2() {
    return (
        <header>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <div>
                        <li><img className={styles.img} src="src/images/Black & White Minimalist Business Logo.png" alt="" /></li>
                    </div>
                    <div className={styles.itemsNav}>
                        <li className={`${styles.active} ${styles.item}`}><i class="fa-solid fa-house"></i>Overview</li>
                        <li className={styles.item}><i class="fa-solid fa-wallet"></i>activities</li>
                        <li className={styles.item}><i class="fa-regular fa-credit-card"></i>credit card</li>
                        <li className={styles.item}><i class="fa-solid fa-landmark"></i>loan</li>
                        <li className={styles.item}><i class="fa-solid fa-money-bill-transfer"></i>transfer</li>
                    </div>
                    <div className={styles.user}>
                            <li className={`${styles.active} ${styles.item}`}><i class="fa-regular fa-user"></i>User</li>
                            <select className={styles.select} name="" id="">
                                <option value="">account1</option>
                                <option value="">account1</option>
                                <option value="">account1</option>
                            </select>
                            <button className={styles.logOutBtn}>Log out</button>
                    </div>
                </ul>
            </nav>
        </header>

    )
}
