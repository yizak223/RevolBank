import React, { useContext, useState } from 'react'
import styles from '../CreateAccount/createAccount.module.css'
import { AccountContext } from '../../context/Account'

export default function CreateCard({
  setOpenModal,
  submitHandler,
  handleChange
}) {
  const [openMessage, setOpenMessage] = useState(false)
  const {  accounts } = useContext(AccountContext)

  return (
    <div>
      <div className={styles.Container}>
        <form onSubmit={submitHandler} className={styles.Form}>
          <h2 className={styles.h2}>Create your card</h2>
         {!openMessage? <label className={styles.label} htmlFor="limit">Limited credit card</label>
         :<label htmlFor="limit">You can change it later </label>}

          <input className={styles.input} onClick={() => { setOpenMessage(!openMessage); }} value={4000} type="number" name='limit' />
          <select required onChange={handleChange} className={styles.select} name="idAccount" >
            <option value="" disabled selected>Select account</option>
            {accounts?.map((account, i) => {
              return (
                <option key={i} value={account._id}>{account.fullName}</option>
              )
            })}
          </select>
          <button type="submit" className={styles.submitBtn}>Order card</button>
          <small className={styles.small}>By creating an card you agree to our <a href="#" className={styles.loginLink}>Terms of Service and Privacy Policy</a>.</small>
          <p onClick={()=>setOpenModal(false)} id="cancelBtn">cancel</p>
        </form>
      </div>
    </div>
  )
}
