import React, { useState } from 'react'
import ModalAlert from '../ModalAlert'

export default function CreateCard({
  accounts,
  submitHandler,
  handleChange
}) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      {openModal && (
        <ModalAlert
        setOpenModal={setOpenModal}
        />
      )}
      <form onSubmit={submitHandler}>
        <select onChange={handleChange} name="idAccount" >
          <option value="" disabled selected>Select account</option>
          {accounts?.map((account, i) => {
            return (
              <option key={i} value={account._id}>{account.fullName}</option>
            )
          })}
        </select>
        {/* <input onChange={handleChange} type="number" name='idAccount' /> */}
        <label htmlFor="limit">Limited credit card</label>
        <input onClick={() => { setOpenModal(true); }} value={4000} type="number" name='limit' />
        <button>invite card</button>
      </form>
    </div>
  )
}
