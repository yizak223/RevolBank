import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import { formatDateTime2 } from '../../config/dateFormat'
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
      setNameTo(resNameTo.data.accounts[0].fullName)
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
                <div className={styles.containerForMobile}>
                  <p className={styles.date}>{formatDateTime2(balance.createdAt)} </p>
                  <p className={styles.activity}>loan</p>
                </div>
                <div className={styles.containerForMobileR}>
                  <p className={styles.amount}>+{balance.amount}</p>
                  <p className={styles.name}>{balance._id.substring(15, 23)}</p>
                </div>
              </div>
              :
              <div className={choosenAccount?._id == balance.to ? styles.transferPlus : styles.transferMinus}>
                <div className={styles.containerForMobile}>
                  <p className={styles.date}> {formatDateTime2(balance.createdAt)}</p>
                  <p className={styles.activity}>transfer</p>
                </div>
                <div className={styles.containerForMobileR}>
                  <p className={styles.amount}>{choosenAccount?._id == balance.to ? '+' : ''}{balance.amount}</p>
                  <p className={styles.name}>
                    {
                      choosenAccount?._id == balance.to ?
                        nameFrom
                        : nameTo
                    }
                  </p>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
