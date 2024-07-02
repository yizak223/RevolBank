import React, { useContext, useEffect, useState } from 'react'
import styles from './totalSpend.module.css'
import { GrTransaction } from "react-icons/gr";
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';

export default function TotalSpend() {
    const { token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)

    const [income, setIncome] = useState(0)
    const [outcome, setOutcome] = useState(0)
    const [loans, setLoans] = useState(0)

    const getIncomeAndOutcomeData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res.data.accounts[0].transactions.forEach(transfer => {
                if (transfer.type === "expenditure") {
                    setIncome((prevCount) => +prevCount + +transfer.amount)
                } else {
                    setOutcome((prevCount) => +prevCount - +transfer.amount)
                }
            })
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err)
        }
    }

    const fetchData = async () => {
        try {
            const idAccount = choosenAccount?._id
            const res = await axios.get(`${baseUrl}/loans?idAccount=${idAccount}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res.data.loans.forEach(loan => {
                setLoans((prev) => +prev + +loan.amount)
            })
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err)
        }
    }

    useEffect(() => {
        setLoans(0)
        setOutcome(0)
        setIncome(0)
        getIncomeAndOutcomeData()
        fetchData()

    }, [choosenAccount])

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
                    <p className={`${styles.howMuch} ${income === 0 ? '' : styles.green}`}>{income === 0 ? `${income}` : `+ $ ${income}`} </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i class="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Transfers</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={`${styles.howMuch} ${outcome === 0 ? '' : styles.red}`}> {`${outcome.toString().substring(0, 1)} ${outcome === 0 ? '' : '$'}   ${outcome.toString().substring(1)}`}</p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <i class="fa-solid fa-landmark"></i>
                        {/* <GrCafeteria className={styles.reactIcon} /> */}
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>loans</p>
                    </div>
                </div>
                <div className={styles.type}>
                    <p className={styles.howMuch}>{loans === 0 ? '' : '$'} {loans}</p>
                </div>
            </div>
            {/* <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                    <GiIsland  className={styles.reactIcon}/>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Vacation</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                    <GiMusicSpell  className={styles.reactIcon}/>
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Entertaiment</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>- $ 355.0 </p>
                </div>
            </div> */}
        </>
    )
}
