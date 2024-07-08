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
import { useSelector } from 'react-redux'
import CreateAccount from '../../components/CreateAccount'

export default function Loans() {
  const modalAcount = useSelector((state) => state.modal.modalAcount);


  const navigate = useNavigate()
  const { token } = useContext(UserContext)
  const { choosenAccount } = useContext(AccountContext)
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
      const res = await Axios.get(`${baseUrl}/loans?idAccount=${idAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
    <>
      {modalAcount ? (
        <CreateAccount />
      ) : null}
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
                      : <button className={styles.prevBtn} onClick={() => {
                        setFirstFour(firstFour - 4)
                        setLastFour(lastFour - 4)
                      }}>previous</button>
                  }
                  {
                    lastFour >= Loans.length ?
                      null
                      : <button className={styles.nextBtn} onClick={() => {
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
    </>
  )
}
