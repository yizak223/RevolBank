import React, { useContext, useEffect, useState } from 'react'
import styles from './totalSpend.module.css'
import { CiShoppingBasket } from "react-icons/ci";
import { GrCafeteria } from "react-icons/gr";
import { GiIsland } from "react-icons/gi";
import { GiMusicSpell } from "react-icons/gi";
import axios from 'axios';
import baseUrl from '../../config/BaseUrl';
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';

export default function TotalSpend() {
    const { token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)

    const [income, setIncome] = useState([])
    const [outcome, setOutcome] = useState([])
    const [loans, setLoans] = useState([])

    const getIncomeAndOutcomeData = async ()=>{
        try {
            const res = await axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res.data.accounts[0].transactions.forEach(transfer => {
                if(transfer.type === "expenditure"){
                    setIncome((prevCount) => +prevCount + +transfer.amount)
                }else{
                    setOutcome((prevCount) => +prevCount - +transfer.amount)
                }
            })
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err)
        }
    }

    

    useEffect(() => {
        getIncomeAndOutcomeData()
      console.log();
    
    }, [choosenAccount])
    
    
    return (
        <>
            <div className={`${styles.TransactionContainer} ${styles.recentTransaction}`}>
                <h2>Total Amount</h2>
                {/* <p className={styles.seeAll}>see all</p> */}
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <CiShoppingBasket className={styles.reactIcon} />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>Receipts</p>
                    </div>
                </div>
                <div>
                    <p className={`${styles.howMuch} ${styles.green}`}>+ $ {income} </p>
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
                <div>
                    <p className={`${styles.howMuch} ${styles.red}`}>- $ {outcome} </p>
                </div>
            </div>
            <div className={styles.TransactionContainer}>
                <div className={styles.iconAndType}>
                    <div className={styles.iconTran}>
                        <GrCafeteria className={styles.reactIcon} />
                    </div>
                    <div className={styles.type}>
                        <p className={styles.whereBuy}>loans</p>
                    </div>
                </div>
                <div>
                    <p className={styles.howMuch}>{loans} </p>
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
