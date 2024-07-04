import React, { useContext, useCallback, useState, useEffect } from 'react';
import styles from './UserSaving.module.css';
import { AccountContext } from '../../context/Account';
import { FaBalanceScale } from "react-icons/fa";
import formatNumberWithCommas from '../../utils/formatNumberWithCommas';

export default function UserSaving() {
    const { choosenAccount } = useContext(AccountContext);
    const [balance, setBalance] = useState("0");
    const [isPositiveBalance, setIsPositiveBalance] = useState(false);

    const checkBalance = useCallback(() => {
        if (!choosenAccount) return;

        const balanceValue = choosenAccount.balance;
        const formattedBalance = formatNumberWithCommas(balanceValue);

        setBalance(formattedBalance);
        setIsPositiveBalance(balanceValue > 0);
    }, [choosenAccount]);

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
                        $ {balance}
                    </h2>
                </div>
                <div className={isPositiveBalance ? styles.progressP : styles.progressN}></div>
                <div className={styles.progressNumber}>
                    {isPositiveBalance ? (
                        <>
                            <p>0</p>
                            <p>{balance}</p>
                        </>
                    ) : (
                        <>
                            <p>{balance}</p>
                            <p>0</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
