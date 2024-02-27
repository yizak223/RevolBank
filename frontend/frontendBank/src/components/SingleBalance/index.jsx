import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import { formatDateTime, formatDateTime2 } from '../../config/dateFormat'
import styles from './singleBalance.module.css'

export default function SingleBalance({ balance, i }) {
  const { choosenAccount } = useContext(AccountContext)
  const { token } = useContext(UserContext)
  const [nameTo, setNameTo] = useState(null)
  const [nameFrom, setNameFrom] = useState(null)

  const fetchNameTo = async () => {
    try {
      const resNameTo = await Axios.get(`${baseUrl}/accounts?_id=${balance.to}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const resNameFrom = await Axios.get(`${baseUrl}/accounts?_id=${balance.from}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(resNameTo.data.accounts[0].fullName);
      setNameTo(resNameTo.data.accounts[0].fullName)
      console.log(resNameFrom.data.accounts[0].fullName);
      setNameFrom(resNameFrom.data.accounts[0].fullName)
    } catch (err) {
      console.log(err)
      setNameFrom('reload...')
      setNameTo('reload...')
    }
  }

  useEffect(() => {
    fetchNameTo()

  }, [token])

  return (
    <div>
      <div className={styles.singleBalnce}>
        <div >
          {
            balance.dueDate ?
              <div className={styles.loan}>
                <div>
                  <h1 className={styles.plus}>+{balance.amount}</h1>
                  <p>loan</p>
                </div>
                <div>
                  <p> {formatDateTime2(balance.createdAt)} - {formatDateTime2(balance.dueDate)} </p>
                  <p className={styles.idBalance}>{balance._id.substring(15, 23)}</p>
                </div>
              </div>
              :
              <div className={styles.transfer}>
                <div>
                  <h1 className={choosenAccount?._id == balance.to ? styles.plus : styles.minus}>{choosenAccount?._id == balance.to ?'+':'-'}{balance.amount}</h1>
                  <p >transfer</p>
                </div>
                {/* {
                  choosenAccount?._id == balance.to ?
                    <p>From: {nameFrom}</p>
                    : <p>To: {nameTo}</p>
                } */}
                <p> {formatDateTime2(balance.createdAt)}</p>
              </div>
          }

        </div>
      </div>
    </div>
  )
}
