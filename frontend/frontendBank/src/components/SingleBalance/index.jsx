import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import formatDateTime from '../../config/dateFormat'

export default function SingleBalance({ balance ,i}) {
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
      <div className="singleBalance">
        <div className="balance">
          {
            balance.dueDate ?
              <>
                <h3>loan</h3>
                <p>Amount: {balance.amount}</p>
                <p>Due date: {formatDateTime(balance.dueDate)}</p>
                <p>trnasfer number: {balance._id}</p>
                <p>In date: {formatDateTime(balance.createdAt)}</p>
              </>
              : <>
                <h3>transfer</h3>
                <p>Amount: {balance.amount}</p>
                {
                  choosenAccount?._id == balance.to ?
                    <p>From: {nameFrom}</p>
                    : <p>To: {nameTo}</p>
                }
                <p>In date: {formatDateTime(balance.createdAt)}</p>
              </>
          }

        </div>
      </div>
    </div>
  )
}
