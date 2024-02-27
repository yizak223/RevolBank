import React, { useContext, useState, useEffect } from 'react'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'
import styles from './singleTransfer.module.css'
import { formatDateTime2 } from '../../config/dateFormat'
export default function SingleTransfer({ transfer }) {
  const [nameTo, setNameTo] = useState()
  const [nameFrom, setNameFrom] = useState()
  const { token } = useContext(UserContext)
  const { choosenAccount } = useContext(AccountContext)

  const fetchNameTo = async () => {
    // console.log(transfer.to);
    try {
      const resNameTo = await Axios.get(`${baseUrl}/accounts?_id=${transfer.to}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const resNameFrom = await Axios.get(`${baseUrl}/accounts?_id=${transfer.from}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(resNameTo.data.accounts[0].fullName);
      setNameTo(resNameTo.data.accounts[0].fullName)
      // console.log(resNameFrom.data.accounts[0].fullName);
      setNameFrom(resNameFrom.data.accounts[0].fullName)
    } catch (err) {
      console.log(err)
    }
  }
  // console.log('choosen account id' + choosenAccount?._id);
  // console.log('choosen account id from ' + transfer?.from);
  // console.log('choosen account id to ' + transfer?.to);
  // console.log(transfer);

  useEffect(() => {
    fetchNameTo()
    // setNameFrom(fetchNameFrom(transfer.from,token))
  }, [token])

  return (
    <div className={styles.singleTransfer}>
      <div className={styles.container}>
        <div className={styles.transfer}>
          <div>
            <h1 className={choosenAccount?._id == transfer.to ? styles.plus : styles.minus}>{choosenAccount?._id == transfer.to ? '+' : '-'}{transfer.amount}</h1>
            <p>{transfer.status == 'succeed' ? 'succeed' : 'still waiting...'}</p>
          </div>
          <div>
            <p> {formatDateTime2(transfer.createdAt)}</p>
            {
              choosenAccount?._id == transfer.to ?
                <h3>{nameFrom} </h3>
                : <h3> {nameTo}</h3>
            }
          </div>
        </div>


      </div>
    </div>
  )
}
