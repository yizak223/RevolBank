import React, { useContext, useState, useEffect } from 'react'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'
import { fetchNameTo, fetchNameFrom } from '../../config/fetchNameTrans'

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
    <div className='singleLoan'>
      <h3>Amount: {transfer.amount}</h3>
      <h3>Type: {transfer.type == null ? 'expenditure' : transfer.type}</h3>
      {choosenAccount?._id == transfer.to ?
        <h3>from:{nameFrom} </h3>
        : <h3>To: {nameTo}</h3>
      }
      <p>{transfer.status=='succeed'? 'succeed':'still waiting...'}</p>
    </div>
  )
}
