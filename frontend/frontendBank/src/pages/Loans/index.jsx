import React, { useEffect, useState, useContext } from 'react'
import SingleLoan from '../../components/SingleLoan'
import { useNavigate } from 'react-router-dom'
import CreateLoan from '../../components/CreateLoan'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'

export default function Loans() {
  const navigate = useNavigate()
  const { token } = useContext(UserContext)
  const { choosenAccount, accounts } = useContext(AccountContext)
  const [Loans, setLoans] = useState([])

  const fetchData = async () => {
    try {
      const idAccount = choosenAccount?._id
      // console.log(choosenAccount);
      // console.log(idAccount);
      const res = await Axios.get(`${baseUrl}/loans?idAccount=${idAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data);
      setLoans(res.data.loans);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err)
    }
  }

  useEffect(() => {
    fetchData();

  }, [token, choosenAccount])


  return (
    <div>
      <button onClick={() => { navigate('/menu') }}>Back to menu</button>
      <CreateLoan setLoans={setLoans} Loans={Loans}/>
      {
        Loans?.map((loan, i) => {
          return <SingleLoan key={i} loan={loan} />
        })
      }
    </div>
  )
}
