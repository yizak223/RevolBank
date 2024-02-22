import React, { useContext, useEffect, useState } from 'react'
import SingleTransfer from '../../components/SingleTransfer'
import CreateTransfer from '../../components/CreateTransfer'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'

export default function Transfers() {
  const navigate = useNavigate()
  const { user, token } = useContext(UserContext)
  const { choosenAccount } = useContext(AccountContext)

  const [transfers, setTransfers] = useState([])
  const [modeType, setModeType] = useState(1)

  const fetchData = async () => {
    try {
      const res = await Axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.accounts[0].transactions);
      setTransfers(res.data.accounts[0].transactions)
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err)
    }
  }

  useEffect(() => {
    fetchData()
    // console.log(token);
    // console.log(choosenAccount);
  }, [token, choosenAccount])
  return (
    <div>
      <button onClick={() => { navigate('/menu') }}>Back to menu</button>
      <CreateTransfer transfers={transfers} setTransfers={setTransfers} />
      <button onClick={() => { setModeType(1) }}>show all</button>
      <button onClick={() => { setModeType(2) }}>show expenditure</button>
      <button onClick={() => { setModeType(3) }}>show income</button>

      {transfers?.filter(transfer => {
        if (modeType === 1) return true; 
        if (modeType === 2) return transfer.type === 'expenditure'; 
        if (modeType === 3) return transfer.type === 'income'; 
      }).map((transfer, i) => (
        <SingleTransfer key={i} transfer={transfer} />
      ))}
    </div>
  );
}
