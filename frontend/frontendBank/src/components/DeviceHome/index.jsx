import React from 'react'
import styles from './DeviceHome.module.css'

export default function DeviceHome() {
    return (
        <body className={styles.body}>
            <div className={styles.containerSides}>
                <div className={styles.left}>
                    <div className={`${styles.smallContainer} ${styles.creditCard}`}>
                        <div className={styles.lftCrdtCrd}>
                            <h3 className={styles.titleCard}>My Card</h3>
                            <div className={styles.container}>
                                <div className={styles.titles}>
                                    <div >
                                        <p>RB</p>
                                    </div>
                                    <div>
                                        <p>VISA</p>
                                    </div>
                                </div>
                                <div className={styles.empty}>
                                    EMPTY
                                </div>
                                <div className={styles.numCard}>
                                    4444-4444-4444-4444
                                </div>
                                <div className={styles.date}>
                                    <p>02/27</p>
                                </div>
                                <div>
                                    <p>Yitzhak Alaluf</p>
                                    <p>322294190</p> </div>
                            </div>
                        </div>
                        <div className={styles.rightCard}>
                            <div className={styles.addCard}><i class="fa-solid fa-plus"></i>Add card</div>
                            <div>sdf</div>
                            <div>asdfg</div>
                        </div>
                    </div>
                    <div className={styles.smallContainer}></div>
                    <div className={styles.smallContainer}></div>
                </div>
                <div className={styles.right}>
                    <div className={styles.smallContainer}></div>
                    <div className={styles.smallContainer}></div>
                    <div className={styles.smallContainer}></div>
                </div>
            </div>
        </body>

    )
}
