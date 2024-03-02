import React, { useContext, useEffect, useState } from 'react';
import styles from './DeviceHome.module.css';
import './DeviceHome.css';
import MyCard from '../MyCard';
import RecentTransaction from '../RecentTransaction';
import UserSaving from '../UserSaving';
import CreateAccount from '../CreateAccount';
import BarChart from '../TransactionChart';
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { CiInboxOut } from "react-icons/ci";
import { CiInboxIn } from "react-icons/ci";
import TotalSpend from '../TotalSpend';


export default function DeviceHome() {
    return (
        <body className={styles.body}>
            <div className={styles.containerSides}>
                <div className={styles.left}>
                    <div className={`${styles.smallContainer} ${styles.creditCard}`}>
                        <MyCard />
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
                        <BarChart />
                    </div>
                    <div className={`${styles.smallContainer} ${styles.summaryTransaction}`}>
                        <div className={styles.summary}>
                            <CiInboxIn className={styles.cilnbox}/>
                            <div>
                                <h5 className={styles.h5}>Income</h5>
                                <h2 className={styles.howMuchIn}>1,900</h2>
                            </div>
                        </div>
                        <div className={styles.summary}>
                            <CiInboxOut className={`${styles.cilnbox} ${styles.cilnboxOut}`}/>
                            <div>
                                <h5 className={styles.h5}>Expanses</h5>
                                <h2 className={styles.howMuchEx}>2,000</h2>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.smallContainer} ${styles.totalSpend}`}>
                    <TotalSpend />
                    </div>
                </div>
            </div>
        </body>
    );
}
