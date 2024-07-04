import React, { useContext, useEffect, useState } from 'react';
import styles from './totalSpend.module.css';
import { GrTransaction } from "react-icons/gr";
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';

export default function TotalSpend({ monthOrYear }) {
    const { token } = useContext(UserContext);
    const { choosenAccount } = useContext(AccountContext);

    const [income, setIncome] = useState(0);
    const [monthAmount] = useState([0, 0, 0])
    const [yearAmount] = useState([0, 0, 0])
    const [outcome, setOutcome] = useState(0);
    const [loans, setLoans] = useState(0);

    const getIncomeAndOutcomeData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const transactions = res.data.accounts[0].transactions;

            const currentDate = new Date();
            const currentmonth = currentDate.getMonth() + 1;

            let totalIncome = 0;
            let totalOutcome = 0;

            transactions.forEach(transfer => {
                let transactionMonth = new Date(transfer.createdAt).getMonth() + 1
                if (transfer.type === "expenditure" && transactionMonth === currentmonth) {
                    totalOutcome += parseFloat(transfer.amount);
                } else if (transfer.type === "income" && transactionMonth === currentmonth) {
                    totalIncome += parseFloat(transfer.amount);
                }
            });
            monthAmount[0] = totalIncome;
            monthAmount[1] = totalOutcome;
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
        }
    };

    const fetchData = async () => {
        try {
            const idAccount = choosenAccount?._id;
            const res = await axios.get(`${baseUrl}/loans?idAccount=${idAccount}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let monthlyLoans = 0;
            const loans = res.data.loans

            const currentDate = new Date();
            const currentmonth = currentDate.getMonth() + 1;

            loans.forEach(loan => {
                let loansMonth = new Date(loan.createdAt).getMonth() + 1
                if (loansMonth === currentmonth) {
                    monthlyLoans += parseFloat(loan.amount);
                }
            });
            monthAmount[2] = monthlyLoans;
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
        }
    };

    useEffect(() => {
        setLoans(0);
        setOutcome(0);
        setIncome(0);

        if (choosenAccount) {
            getIncomeAndOutcomeData();
            fetchData();
        }
    }, [choosenAccount]);

    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Total Amount</h2>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <GrTransaction className={styles.reactIcon} />
                        {/* <CiShoppingBasket className={styles.reactIcon} /> */}
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Receipts</p>
                    </div>
                </div>
                <div className={styles.type}>
                    {
                        monthOrYear ?
                            <p className={`${styles.howMuch} ${monthAmount[0] === 0 ? '' : styles.green}`}>{monthAmount[0] === 0 ? `${monthAmount[0]}` : `+ $ ${monthAmount[0]}`} </p>
                            :
                            <p>{yearAmount[0]}</p>
                    }
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Transfers</p>
                    </div>
                </div>
                <div className={styles.type}>
                    {
                        monthOrYear ?
                            <p className={`${styles.howMuch} ${monthAmount[1] === 0 ? '' : styles.red}`}> {`${monthAmount[1] === 0 ? '' : '- $'}   ${monthAmount[1]}`} </p>
                            :
                            <p>{yearAmount[1]}</p>
                    }
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-landmark"></i>
                        {/* <GrCafeteria className={styles.reactIcon} /> */}
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>loans</p>
                    </div>
                </div>
                <div className={styles.type}>
                    {
                        monthOrYear ?
                            <p className={styles.howMuch}>{monthAmount[2] === 0 ? '' : '$'} {monthAmount[2]}</p>
                            :
                            <p>{yearAmount[2]}</p>
                    }
                </div>
            </div>
        </>
    );
}
