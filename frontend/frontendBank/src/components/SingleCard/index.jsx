import React, { useContext, useEffect, useState } from 'react'
import './singleCard.css'
import Axios from 'axios';
import { UserContext } from '../../context/User';
import BaseUrl from '../../config/BaseUrl';

export default function SingleCard({ card, cards, setCards }) {
  const dateExpiration = card.expirationDate
  const { token } = useContext(UserContext)
  const [disabledCard, setDisabledCard] = useState(false)

  const dateObject = new Date(dateExpiration);
  const deleteCard = async (id) => {
    try {
      const res = await Axios.patch(`${BaseUrl}/crditCard/${id}`, { isActive: false }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const updatedCards = cards.filter(card => card._id != id);
      setCards(updatedCards);
      console.log(cards);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='creditCard'>
      <h3>Account: {card.idAccount}</h3>
      <h3>Card Number: {card.cardNumber}</h3>
      <h3>Limit: {card.limit}</h3>
      <h3>Expiration Date: {dateObject.toDateString()}</h3>

      <>
        {card.isActive ? <>
          <h3>Active</h3><button onClick={() => {
            deleteCard(card._id
            )
          }}>Delete card</button>
        </> : <h3>Don't active</h3>}
      </>

    </div>
  )
}
