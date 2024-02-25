import React, { useContext } from 'react'
import './SingleLoan.css'
import formatDateTime from '../../config/dateFormat';
import { UserContext } from '../../context/User'


export default function SingleLoan({ loan }) {
  const { token, user } = useContext(UserContext)

  return (
    <div className='singleLoan'>
      <h3>Amount: {loan?.amount}</h3>
      <h3>Final pay: {loan?.finalAmount}</h3>
      <h3>Date to pay: {formatDateTime(loan?.dueDate)}</h3>
      <h3>Status: {loan?.status}</h3>
      {user.role == 'admin' ?
        <>
          {
            loan.status == 'pending' ?
              <>
                <h4>waiting for confirn</h4>
                <button>confirm</button>
                <button>Deny</button>
              </> :
              <p>You confirmed it</p>
          }
        </>
        : null}

    </div>
  )
}
