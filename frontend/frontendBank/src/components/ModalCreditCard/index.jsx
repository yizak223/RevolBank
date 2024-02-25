import React from 'react'
import formatDateTime from '../../config/dateFormat';

export default function ModalCreditCard({ setOpenModal, card }) {
    console.log(card);
    return (
        <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => { setOpenModal(false); }} >X </button>
          </div>
          <div className="title">
            <h1> Card Number: {card.cardNumber}</h1>
          </div>
          <div className="body">
            <p>{new Date(card.createdAt).getMonth() + 1}/{new Date(card.createdAt).getFullYear()} - 
            {new Date(card.expirationDate).getMonth() + 1}/{new Date(card.expirationDate).getFullYear()}</p>
            <p>Limit: 0 - {card.limit}</p> 
            {/* { add an limit key of the transactions} */}
            <p>ACTIVE</p>
          </div>
            <div className="footer">
              <button onClick={() => { setOpenModal(false); }} id="cancelBtn"> cancel </button>
              <button >Sent me cvv</button>
            </div>
        </div>
      </div>
    )
}
