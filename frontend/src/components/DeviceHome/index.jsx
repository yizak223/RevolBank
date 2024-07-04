import React, { useState } from 'react';
import styles from './DeviceHome.module.css';
import './DeviceHome.css';
import MyCard from '../MyCard';
import RecentTransaction from '../RecentTransaction';
import UserSaving from '../UserSaving';
import BarChart from '../TransactionChart';
import TotalSpend from '../TotalSpend';
import ModalAlert from '../ModalAlert';
import CoinsAndShare from '../Coins&Share/CoinsAndShare';


export default function DeviceHome() {
    const [openModal, setOpenModal] = useState(false)
    const [cards, setCards] = useState([])
    const [showCard, setShowCard] = useState(0)
    const [monthOrYear, setMonthOrYear] = useState(true)

    return (
        <>
            <div className={styles.body}>
                {openModal && (
                    <ModalAlert
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        setCards={setCards}
                        setShowCard={setShowCard}
                        cards={cards}
                        showCard={showCard}
                    />
                )}
                <div className={styles.containerSides}>
                    <div className={styles.left}>
                        <div className={`${styles.smallContainer} ${styles.creditCard}`}>
                            <MyCard
                                setOpenModal={setOpenModal}
                                setCards={setCards}
                                setShowCard={setShowCard}
                                showCard={showCard}
                                cards={cards}
                            />
                        </div>
                        <div className={`${styles.smallContainer} ${styles.RecentTransaction}`}>
                            <RecentTransaction />
                        </div>
                        <div className={`${styles.smallContainer} ${styles.mySaving}`}>
                            <UserSaving />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={`${styles.smallContainer} ${styles.BarChart}`}>
                            <BarChart
                                setMonthOrYear={setMonthOrYear}
                                monthOrYear={monthOrYear} />
                        </div>
                        <div className={`${styles.smallContainer} ${styles.totalSpend}`}>
                            <TotalSpend
                                monthOrYear={monthOrYear} />
                        </div>
                        <div className={`${styles.smallContainer} ${styles.coins}`}>
                            <CoinsAndShare />
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <h3 className={styles.h3}>
                        &copy; 2024 RevolBank. All rights reserved to Yitzhak Alaluf
                    </h3>
                </div>
            </div>
        </>

    );
}
