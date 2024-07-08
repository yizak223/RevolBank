import React, { useContext, useState, useEffect } from 'react'
import SingleBalance from '../../components/SingleBalance'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import styles from './balnces.module.css'
import { useSelector } from 'react-redux'
import CreateAccount from '../../components/CreateAccount'

export default function Balances() {
  const modalAcount = useSelector((state) => state.modal.modalAcount);

  
  const { choosenAccount } = useContext(AccountContext)
  const { token } = useContext(UserContext)
  const [balances, setBalances] = useState([])
  const [firstFour, setFirstFour] = useState(0)
  const [lastFour, setLastFour] = useState(7)

  const fetchLoansData = async () => {
    try {
      const idAccount = choosenAccount?._id
      const res = await Axios.get(`${baseUrl}/loans/latestLoans?idAccount=${idAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.recentLoans);
      setBalances(prevBalances => [...prevBalances, ...res.data.recentLoans]);

    } catch (err) {
      console.error('There was a problem with the fetch operation:', err)
    }
  }
  const fetchTransfersData = async () => {
    try {
      const res = await Axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBalances(prevBalances => [...prevBalances, ...res.data.accounts[0].transactions]);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err)
    }
  }

  useEffect(() => {
    setBalances([])
    fetchLoansData()
    fetchTransfersData()

  }, [token, choosenAccount])

  const sortBalancesByDate = (balances) => {
    return balances.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <>
      {modalAcount ? (
        <CreateAccount />
      ) : null}
      <div className={styles.container}>
        <div className={styles.activities}>
          {/* Render your sorted balancses here */}
          {/* Example: */}
          {
            balances.length != 0 ? <select className={styles.select} name="" id="">
              <option disabled selected>activities</option>
              <option value="">last ten</option>
              <option value="">last month</option>
              <option value="">last year</option>
            </select>
              : <h2 className={styles.h2}>NO ACTIVITIES </h2>
          }
          <div className={styles.containerBalances}>
            {sortBalancesByDate(balances).map((balance, i) => (
              firstFour <= i && i < lastFour ?
                <SingleBalance key={i} balance={balance} />
                : null
            ))}
            {
              firstFour == 0 ? null
                : <button className={styles.prevBtn} onClick={() => {
                  setFirstFour(firstFour - 7)
                  setLastFour(lastFour - 7)
                }}>previous</button>
            }
            {
              lastFour >= balances.length ?
                null
                : <button className={styles.nextBtn} onClick={() => {
                  setFirstFour(firstFour + 7)
                  setLastFour(lastFour + 7)
                }}>next</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}
