import React, { useContext, useEffect, useState } from 'react'
import './singleCard.css'
import Axios from 'axios';
import { UserContext } from '../../context/User';
import BaseUrl from '../../config/BaseUrl';
import { AccountContext } from '../../context/Account';
import { formatDateTime3 } from '../../config/dateFormat';
import styles from './singleCard.module.css';
import { cardNumberFormat } from '../../config/cardNumberFormat';

export default function SingleCard({ card, cards, setCards }) {
  const dateExpiration = card.expirationDate
  const { token } = useContext(UserContext)
  const { choosenAccount } = useContext(AccountContext)

  const dateObject = new Date(dateExpiration);
 

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <div >
          <p>RB</p>
        </div>
        <div>
          <p>VISA</p>
        </div>
      </div>
      <div className={styles.empty}>
        EMPTY
        </div>
      <div className={styles.numCard}>
        {cardNumberFormat(card.cardNumber)}
        </div>
      <div className={styles.date}>
        <p>{formatDateTime3(dateExpiration)}</p> 
        </div>
      <div>
        <p>{choosenAccount.fullName}</p>
        <p>{card.idAccount}</p> </div>
      <>
        {card.isActive ? <>
          {/* <button className={styles.dltBtn} onClick={() => {
            deleteCard(card._id
            )
          }}><i class="fa-sharp fa-solid fa-trash"></i></button> */}
        </> : <h3>Don't active</h3>}
      </>
    </div>
  )
}
