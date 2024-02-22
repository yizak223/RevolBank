import React, { useContext, useState, useEffect } from 'react'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'

export default function SingleTransfer({ transfer }) {
  const [nameTo, setNameTo] = useState()
  const { token } = useContext(UserContext)

  const fetchData = async () => {
    console.log(transfer.to);
    try {
      const res = await Axios.get(`${baseUrl}/accounts?_id=${transfer.to}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.accounts[0].fullName);
      setNameTo(res.data.accounts[0].fullName)
    } catch (err) {
      console.log(err)
    }
  }
useEffect(()=>{
  fetchData()
},[token])
  return (
    <div className='singleLoan'>
      <h3>Type: {transfer.type==null?'expenditure':transfer.type}</h3>
      <h3>Transfer Number: {transfer._id}</h3>
      <h3>Amount: {transfer.amount}</h3>
      <h3>To: {nameTo}</h3>
    </div>
  )
}
