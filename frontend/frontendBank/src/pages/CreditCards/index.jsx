import React, { useEffect, useState, useContext } from 'react'
import SingleCard from '../../components/SingleCard'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import './creditCard.css'
import BaseUrl from '../../config/BaseUrl'
import CreateCard from '../../components/CreateCard'

export default function CreditCard() {
  const { user, token } = useContext(UserContext)
  const { choosenAccount, accounts } = useContext(AccountContext)
  const [cards, setCards] = useState([])
  const [accountState, setAccountState] = useState(choosenAccount)
  const [createCardMode, setCreateCardMode] = useState(false)
  const [creditCard, setCreditCard] = useState({
    idAccount: accountState
  })

  const fetchData = async () => {
    try {
      const idAccount = choosenAccount?._id
      console.log(choosenAccount);
      console.log(idAccount);
      const res = await Axios.get(`${BaseUrl}/crditCard?idAccount=${idAccount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(res.data);
      const updatedCards = res.data.creditCards.filter(card => card.isActive !== false);
      setCards(updatedCards);
      console.log(updatedCards);
      console.log(cards);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
    }
  }

  const handleChange = (e) => {
    setAccountState(e.target.value);
    setCreditCard({ ...creditCard, idAccount: e.target.value })
    console.log(creditCard);
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(creditCard);
    try {
      const res = await Axios.post(`${BaseUrl}/crditCard`, creditCard, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCards([...cards, res.data])
      setCreateCardMode(!createCardMode)
      console.log(res.data);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [token, choosenAccount])

  return (
    <div>
      {
        cards.length < 2 ? <>
          <button onClick={() => { setCreateCardMode(!createCardMode) }}>Create Card</button>
          {
            createCardMode ?
              <CreateCard submitHandler={submitHandler} handleChange={handleChange} accounts={accounts} />
              : null
          }
        </> : null
      }

      {cards?.map((card, i) => (
        card.isActive ? <SingleCard key={i} card={card} cards={cards} setCards={setCards} /> : null
      ))}
    </div>
  )
}
