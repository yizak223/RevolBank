import React, { useContext } from 'react'
import './singleCard.css'
import { AccountContext } from '../../context/Account';
import { formatDateTime3 } from '../../config/dateFormat';
import styles from './singleCard.module.css';
import { cardNumberFormat } from '../../config/cardNumberFormat';
import accountNumberConvert from '../../utils/accountNumberConvert';

export default function SingleCard({ card }) {
  const dateExpiration = card.expirationDate
  const { choosenAccount } = useContext(AccountContext)

  const dateObject = new Date(dateExpiration);


  return (
    <div>
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
          <p>{accountNumberConvert(card.numberAccount)}</p> </div>
      </div>
    </div>

  )
}
