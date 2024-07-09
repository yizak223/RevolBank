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
  const [sortType, setSortType] = useState('date');
  const [timeFrame, setTimeFrame] = useState('month');

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
      let payLoad = res.data.accounts[0].transactions

      payLoad.map(transaction =>{
        if (transaction.type === 'expenditure') {
          transaction.amount = -transaction.amount 
        }
      })

      setBalances(prevBalances => [...prevBalances, ...payLoad]);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err)
    }
  }

  useEffect(() => {
    setBalances([])
    fetchLoansData()
    fetchTransfersData()

  }, [token, choosenAccount])

  const sortBalances = (balances) => {
    return balances.sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortType === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });
  };

  const filterBalances = (balances) => {
    const now = new Date();
    const timeLimit = timeFrame === 'month' ?
      new Date(now.setMonth(now.getMonth() - 1)) :
      new Date(now.setFullYear(now.getFullYear() - 1));

    return balances.filter(balance => new Date(balance.createdAt) > timeLimit);
  };


  return (
    <>
      {modalAcount && <CreateAccount createAccountStyle={createAccountStyle} />}

      <div className={styles.container}>
        <div className={styles.activities}>
          <SortBy
            sortType={sortType}
            setSortType={setSortType}
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
          />
          {balances.length === 0 ? (
            <h2 className={styles.noActivities}>NO ACTIVITIES</h2>
          ) : (
            <>
              <Titles />
              <div className={styles.containerBalances}>
                {
                  sortBalances(filterBalances(balances)).map((balance, i) => (
                    next <= i && i < prev ?
                      <SingleBalance key={i} balance={balance} />
                      : null
                  ))
                }
                {
                  next == 0 ? null
                    :
                    <PrevBtn />
                }
                {
                  prev >= balances.length ?
                    null
                    :
                    <NextBtn />
                }
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
