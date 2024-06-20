import React, { useContext, useState } from 'react'
import styles from '../CreateAccount/createAccount.module.css'
import { AccountContext } from '../../context/Account'

export default function CreateCard({
  submitHandler,
  handleChange
}) {
  const [openModal, setOpenModal] = useState(false)
  const {  accounts } = useContext(AccountContext)

  return (
    <div>
      <div className={styles.Container}>
        <form onSubmit={submitHandler} className={styles.Form}>
          <h2 className={styles.h2}>Create your card</h2>
         {!openModal? <label className={styles.label} htmlFor="limit">Limited credit card</label>
         :<label htmlFor="limit">You can change it later </label>}

          <input className={styles.input} onClick={() => { setOpenModal(!openModal); }} value={4000} type="number" name='limit' />
          <select required onChange={handleChange} className={styles.select} name="idAccount" >
            <option value="" disabled selected>Select account</option>
            {accounts?.map((account, i) => {
              return (
                <option key={i} value={account._id}>{account.fullName}</option>
              )
            })}
          </select>
          {/* <label className={styles.label} htmlFor="terms">Enroll in Expo Developer Services</label> */}
          <button type="submit" className={styles.submitBtn}>Order card</button>
          <small className={styles.small}>By creating an card you agree to our <a href="#" className={styles.loginLink}>Terms of Service and Privacy Policy</a>.</small>
        </form>
      </div>
    </div>
  )
}
