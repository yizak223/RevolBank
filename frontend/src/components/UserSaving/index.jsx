import React, { useContext, useCallback, useState, useEffect } from 'react';
import styles from './UserSaving.module.css';
import { AccountContext } from '../../context/Account';
import { FaBalanceScale } from "react-icons/fa";
import { convertStringToNumber } from '../../utils/formatNumberWithCommas';

export default function UserSaving() {
    const { balanceuser } = useContext(AccountContext);
    const [isPositiveBalance, setIsPositiveBalance] = useState(false);

    const checkBalance = useCallback(() => {
        if (!balanceuser) return;

        let balanceValue = balanceuser
        balanceValue = convertStringToNumber(balanceValue);

        setIsPositiveBalance(balanceValue > 0);
    }, [balanceuser]);

    useEffect(() => {
        checkBalance();
    }, [checkBalance]);

    return (
        <>
            <div className={styles.mySavingTitle}>
                <h2>Balance</h2>
            </div>
            <div className={styles.mySavingContainer}>
                <div className={styles.titleSaving}>
                    <div className={styles.containIcon}>
                        <FaBalanceScale />
                    </div>
                    <h2 className={isPositiveBalance ? styles.h2P : styles.h2N}>
                        $ {balanceuser}
                    </h2>
                </div>
                <div className={isPositiveBalance ? styles.progressP : styles.progressN}></div>
                <div className={styles.progressNumber}>
                    {isPositiveBalance ? (
                        <>
                            <p>0</p>
                            <p>{balanceuser}</p>
                        </>
                    ) : (
                        <>
                            <p>{balanceuser}</p>
                            <p>0</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
