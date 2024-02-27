import React, { useEffect, useState, useContext } from 'react'
import SingleLoan from '../../components/SingleLoan'
import { useNavigate } from 'react-router-dom'
import CreateLoan from '../../components/CreateLoan'
import baseUrl from '../../config/BaseUrl'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import ModalLoan from '../../components/ModalLoan'
import styles from './loan.module.css'

export default function Loans() {
  const navigate = useNavigate()
  const { token, user } = useContext(UserContext)
  const { choosenAccount, accounts } = useContext(AccountContext)
  const [firstFour, setFirstFour] = useState(0)
  const [lastFour, setLastFour] = useState(4)
  const [Loans, setLoans] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0)
  const [loan, setLoan] = useState([])
  const [createLoan, setCreateLoan] = useState(false)

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
    <div className={styles.containerPage}>
      <div className={styles.secContainer}>
        <div>
          <div className={styles.containerBtns}>
            <button className={styles.backBtn} onClick={() => { navigate('/menu') }}>Back to menu</button>
            <button className={createLoan ? styles.red : styles.green} onClick={() => { setCreateLoan(!createLoan) }}>{!createLoan ? 'Create Loan' : 'Cancel'}</button>
          </div>


          {modalOpen && (
            <ModalLoan
              index={index}
              loan={loan}
              setOpenModal={setModalOpen}
            />
          )}
          {Loans?.map((loan, i) => {
            return (
              <div key={i}>
                {
                  firstFour <= i && i < lastFour ?
                    <SingleLoan fetchModal={fetchModal} setModalOpen={setModalOpen} loan={loan} i={i} />
                    : null
                }
                {
            firstFour == 0 ? null
              : <button onClick={() => {
                setFirstFour(firstFour - 4)
                setLastFour(lastFour - 4)
              }}>previous</button>
          }
          {
            lastFour >= Loans.length ?
              null
              : <button onClick={() => {
                setFirstFour(firstFour + 4)
                setLastFour(lastFour + 4)
              }}>next</button>
          }
              </div>
            )
          })
          }
        </div>
        <div className={styles.left}>
          {
            createLoan ?
              <CreateLoan setCreateLoan={setCreateLoan} createLoan={createLoan} setLoans={setLoans} Loans={Loans} />
              : <img className={styles.logoimg} src="src/images/KB.png" alt="" />
          }
        </div>

      </div>
    </div>
  )
}
