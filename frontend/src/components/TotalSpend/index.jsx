import React, { useContext, useEffect, useState, useCallback } from 'react';
import styles from './totalSpend.module.css';
import { GrTransaction } from "react-icons/gr";
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';

const fetchAccountData = async (accountId, token) => {
    const res = await axios.get(`${baseUrl}/accounts?_id=${accountId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.accounts[0].transactions;
};

const fetchLoanData = async (accountId, token) => {
    const res = await axios.get(`${baseUrl}/loans?idAccount=${accountId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.loans;
};

const calculateAmounts = (transactions, type, datePartFn, currentDatePart) => {
    return transactions.reduce((acc, transfer) => {
        if (transfer.type === type && datePartFn(new Date(transfer.createdAt)) === currentDatePart) {
            acc += parseFloat(transfer.amount);
        }
        return acc;
    }, 0);
};

const calculateLoanAmounts = (loans, datePartFn, currentDatePart) => {
    return loans.reduce((acc, loan) => {
        if (datePartFn(new Date(loan.createdAt)) === currentDatePart) {
            acc += parseFloat(loan.amount);
        }
        return acc;
    }, 0);
};

const TotalSpend = ({ monthOrYear }) => {
    const { token } = useContext(UserContext);
    const { choosenAccount } = useContext(AccountContext);

    const [monthAmount, setMonthAmount] = useState([0, 0, 0]);
    const [yearAmount, setYearAmount] = useState([0, 0, 0]);

    const fetchData = useCallback(async () => {
        if (!choosenAccount) return;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        try {
            const transactions = await fetchAccountData(choosenAccount._id, token);

            const monthlyIncome = calculateAmounts(transactions, 'income', date => date.getMonth() + 1, currentMonth);
            const monthlyOutcome = calculateAmounts(transactions, 'expenditure', date => date.getMonth() + 1, currentMonth);
            const yearlyIncome = calculateAmounts(transactions, 'income', date => date.getFullYear(), currentYear);
            const yearlyOutcome = calculateAmounts(transactions, 'expenditure', date => date.getFullYear(), currentYear);

            const loans = await fetchLoanData(choosenAccount._id, token);

            const monthlyLoans = calculateLoanAmounts(loans, date => date.getMonth() + 1, currentMonth);
            const yearlyLoans = calculateLoanAmounts(loans, date => date.getFullYear(), currentYear);

            setMonthAmount([monthlyIncome, monthlyOutcome, monthlyLoans]);
            setYearAmount([yearlyIncome, yearlyOutcome, yearlyLoans]);
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
        }
    }, [choosenAccount, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderAmount = (amount, className, prefix = '') => (
        <p className={`${styles.howMuch} ${amount === 0 ? '' : className}`}>
            {amount === 0 ? `${amount}` : `${prefix} $ ${amount}`}
        </p>
    );

    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Total Amount</h2>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <GrTransaction className={styles.reactIcon} />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Receipts</p>
                        <div className={styles.toolRecived}>Total transfers you received</div>
                    </div>
                </div>
                <div className={styles.type}>
                    {monthOrYear ? renderAmount(monthAmount[0], styles.green, '+') : renderAmount(yearAmount[0], styles.green, '+')}
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Transfers</p>
                        <div className={styles.toolMade}>Total transfers you made</div>

                    </div>
                </div>
                <div className={styles.type}>
                    {monthOrYear ? renderAmount(monthAmount[1], styles.red, '-') : renderAmount(yearAmount[1], styles.red, '-')}
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i className="fa-solid fa-landmark"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Loans</p>
                        <div className={styles.toolLoans}>Total Loans</div>
                    </div>
                </div>
                <div className={styles.type}>
                    {monthOrYear ? <p className={styles.howMuch}>{monthAmount[2] === 0 ? '' : '$'} {monthAmount[2]}</p> : <p className={styles.howMuch}>{yearAmount[2] === 0 ? '' : '$ '} {yearAmount[2]}</p>}
                </div>
            </div>
        </>
    );
}

export default TotalSpend;
