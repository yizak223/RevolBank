import React, { useContext } from 'react'
import './SingleLoan.css'
import { formatDateTime, formatDateTime2, formatDateTime3 } from '../../config/dateFormat';
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account';
import styles from './SingleLoan.module.css'


export default function SingleLoan({ loan, i, setModalOpen, fetchModal }) {
  const { user } = useContext(UserContext)
  const { choosenAccount } = useContext(AccountContext)

  return (
    <div className={styles.SingleLoan}>
      <div className={styles.container}>
        <div onClick={() => {
          setModalOpen(true)
          fetchModal(loan, i)
        }} className={styles.secContianer}>
          <div>
            <h1> {loan?.amount}</h1>
          </div>
          <div>
            <p>{formatDateTime2(loan.createdAt)}</p>
            <p>{loan._id}</p>
          </div>
        </div>
        <div >
          {user.role == 'admin' ?
            <>
              {
                loan.status == 'pending' ?
                  <>
                    <p className={styles.waiting}><b>{choosenAccount._id} waiting for confirn</b></p>
                    <button className={styles.btnconfirm}>confirm</button>
                    <button className={styles.btndeny}>Deny</button>
                  </> :
                  <p>confirmed </p>
              }
            </>
            : null}
        </div>
      </div>


    </div>
  )
}
