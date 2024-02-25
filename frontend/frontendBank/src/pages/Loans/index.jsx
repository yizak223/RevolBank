import React, { useEffect, useState, useContext } from 'react'
import SingleLoan from '../../components/SingleLoan'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateLoan from '../../components/CreateLoan'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import ModalLoan from '../../components/ModalLoan'

export default function Loans() {
  const location = useLocation();
  const navigate = useNavigate()
  const { token, user } = useContext(UserContext)
  const { choosenAccount, accounts } = useContext(AccountContext)
  const [Loans, setLoans] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0)
  const [loan, setLoan] = useState([])
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

  const fetchModal = (loan, index) => {
    setIndex(index)
    setLoan(loan)
  }

  useEffect(() => {
    fetchData();
  }, [token, choosenAccount])

  return (
    <div>
      {/* {
      location.pathname=='/menu'?null: */}
      <button onClick={() => { navigate('/menu') }}>Back to menu</button>
      {/* } */}
      <CreateLoan setLoans={setLoans} Loans={Loans} />
      {modalOpen && (
        <ModalLoan
          index={index}
          loan={loan}
          setOpenModal={setModalOpen}
        />
      )}
      {Loans?.map((loan, i) => {
        return (
          <div key={i} onClick={() => {
            setModalOpen(true);
            fetchModal(loan, i)
          }}>
            <SingleLoan loan={loan} />
          </div>
        )
      })
      }
    </div>
  )
}
