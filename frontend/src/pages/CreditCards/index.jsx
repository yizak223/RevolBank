import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import CreateAccount from '../../components/CreateAccount';
import SingleCard from '../../components/SingleCard'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import BaseUrl from '../../config/BaseUrl'
import CreateCard from '../../components/CreateCard'
import ModalCreditCard from '../../components/ModalCreditCard'
import styles from '../../components/About/about.module.css'
import styles2 from '../Home/home.module.css'
import styles3 from './creditCrad.module.css'


export default function CreditCard() {
  const modalAcount = useSelector((state) => state.modal.modalAcount);

  const { token } = useContext(UserContext)
  const { choosenAccount, accounts } = useContext(AccountContext)
  const [cards, setCards] = useState([])
  const [accountState, setAccountState] = useState(choosenAccount)
  const [createCardMode, setCreateCardMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [card, setcard] = useState([])
  const [creditCard, setCreditCard] = useState({
    idAccount: accountState
  })

  const createAccountStyle = false

  const fetchData = async () => {
    try {
      const idAccount = choosenAccount?._id
      const res = await Axios.get(`${BaseUrl}/crditCard?idAccount=${idAccount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(res.data);
      const updatedCards = res.data.creditCards.filter(card => card.isActive !== false);
      setCards(updatedCards);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
    }
  }
  const deleteCard = async (id) => {
    try {
      const res = await Axios.patch(`${BaseUrl}/crditCard/${id}`, { isActive: false }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const updatedCards = cards.filter(card => card._id != id);
      setCards(updatedCards);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchModal = (transfer) => {
    setcard(transfer)
  }

  const handleChange = (e) => {
    setAccountState(e.target.value);
    setCreditCard({ ...creditCard, idAccount: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.post(`${BaseUrl}/crditCard`, creditCard, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCards([...cards, res.data])
      setCreateCardMode(!createCardMode)
    } catch (error) {
      console.error('Error creating account:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [token, choosenAccount])

  return (
    <>
      {modalAcount ? (
        <CreateAccount  createAccountStyle={createAccountStyle}/>
      ) : null}
      <div className={styles2.container}>
        <div className={styles3.secContainer}>
          <div className={styles.left}>
            {modalOpen && (
              <ModalCreditCard
                card={card}
                setOpenModal={setModalOpen}
              />
            )}
            {cards?.map((card, i) => (
              <div key={i}>
                {card.isActive ?
                  <div className={styles3.containerCard}>
                    <div className={styles3.cardOption}>
                      <div className={styles3.maximize}>
                        <i onClick={() => {
                          setModalOpen(true);
                          fetchModal(card)
                        }} className="fa-solid fa-maximize"></i>
                      </div>
                      <button className={styles.dltBtn} onClick={() => { deleteCard(card._id) }}>
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <SingleCard card={card} cards={cards} setCards={setCards} />
                  </div>
                  : null}
              </div>
            ))}
            {
              cards.length < 2 ? <>
                <button className={createCardMode ? styles3.red : styles3.green} onClick={() => { setCreateCardMode(!createCardMode) }}>{createCardMode ? 'cancel' : 'Create Card'}</button> </>
                : null
            }
          </div>
          <div className={styles3.right}>
            {
              createCardMode ?
                <CreateCard submitHandler={submitHandler} handleChange={handleChange} accounts={accounts} />
                : <img className={styles3.img} src="src/images/KB.png" alt="" />
            }

          </div>
        </div>
      </div>
    </>


  )
}
