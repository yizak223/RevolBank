import React, { useContext, useState, useEffect } from 'react'
import SingleBalance from '../../components/SingleBalance'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import styles from './balnces.module.css'
import { useSelector } from 'react-redux'
import CreateAccount from '../../components/CreateAccount'
import NextBtn from './NextBtn'
import PrevBtn from './PrevBtn'
import Titles from './Titles'
import SortBy from './SortBy'

export default function Balances() {
  const modalAcount = useSelector((state) => state.modal.modalAcount);

  const { choosenAccount } = useContext(AccountContext)
  const { token } = useContext(UserContext)
  const [balances, setBalances] = useState([])
  const [next, setNext] = useState(0)
  const [prev, setPrev] = useState(7)

  const createAccountStyle = false


  const fetchLoansData = async () => {
    try {
      const idAccount = choosenAccount?._id
      const res = await Axios.get(`${baseUrl}/loans/latestLoans?idAccount=${idAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
        <CreateAccount createAccountStyle={createAccountStyle} />
      ) : null}

      <div className={styles.container}>
        <div className={styles.activities}>
          {
            balances.length != 0 ?
              <SortBy />
              : <h2 className={styles.h2}>NO ACTIVITIES </h2>
          }

          <Titles />
          <div className={styles.containerBalances}>
            {
              sortBalancesByDate(balances).map((balance, i) => (
                next <= i && i < prev ?
                  <SingleBalance key={i} balance={balance} />
                  : null
              ))
            }
            {
              next == 0 ? null
                :
                <PrevBtn className={styles.prevBtn} />
            }
            {
              prev >= balances.length ?
                null
                :
                <NextBtn className={styles.nextBtn} />
            }
          </div>
        </div>
      </div>
    </>
  )
}
