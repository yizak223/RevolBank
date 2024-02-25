import React, { useContext, useEffect, useState } from 'react'
import './ModalTransfer.css'
import formatDateTime from '../../config/dateFormat';
import { AccountContext } from '../../context/Account';
import { UserContext } from '../../context/User';
import baseUrl from '../../config/BaseUrl';
import Axios from 'axios';

export default function ModalTransfer({ setOpenModal, transfer }) {
  const { choosenAccount } = useContext(AccountContext)
  const { token } = useContext(UserContext)
  const [nameTo, setNameTo] = useState()
  const [nameFrom, setNameFrom] = useState()

  const fetchNameTo = async () => {
    // console.log(transfer.to);
    try {
      const resNameTo = await Axios.get(`${baseUrl}/accounts?_id=${transfer.to}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const resNameFrom = await Axios.get(`${baseUrl}/accounts?_id=${transfer.from}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(resNameTo.data.accounts[0].fullName);
      setNameTo(resNameTo.data.accounts[0].fullName)
      // console.log(resNameFrom.data.accounts[0].fullName);
      setNameFrom(resNameFrom.data.accounts[0].fullName)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchNameTo()
    // setNameFrom(fetchNameFrom(transfer.from,token))
  }, [token])
  console.log(transfer);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => { setOpenModal(false); }} >X </button>
        </div>
        <div className="title">
          <h1>Number Transaction: {transfer._id}</h1>
        </div>
        <div className="body">
          <p>in {formatDateTime(transfer.createdAt)}</p>
          {choosenAccount?._id == transfer.to ?
            <p>{nameFrom} sent you {transfer.amount}$</p>
            : <p>You sent {transfer.amount}$ to {nameTo}</p>}
          <p></p>
        </div>{transfer.status == 'succeed' ? null :
          <div className="footer">
            <button onClick={() => { setOpenModal(false); }} id="cancelBtn"> Deny </button>
            <button >Accept</button>
          </div>}
      </div>
    </div>
  )
}
// onClick={() => { addItemToUser(itemName) }}
