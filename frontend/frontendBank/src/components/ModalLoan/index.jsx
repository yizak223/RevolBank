import React,{useContext} from 'react'
import formatDateTime from '../../config/dateFormat';
import { AccountContext } from '../../context/Account';
import { UserContext } from '../../context/User';

export default function ModalLoan({setOpenModal,loan}) {
    const { choosenAccount } = useContext(AccountContext)
    const { user } = useContext(UserContext)
    console.log(loan);
    return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button onClick={() => { setOpenModal(false); }} >X </button>
            </div>
            <div className="title">
              <h1>Number Loan: {loan._id}</h1>
            </div>
            <div className="body">
              <p>in {formatDateTime(loan.createdAt)} you loaned {loan.amount}$</p>
              {/* need to add field of when the loan actually happend */}
              <p>You need to pay every month {loan.everyMonth} until {formatDateTime(loan.dueDate)}</p>
              <span className='details'>final amount: {loan.finalAmount}</span>
              <span className='details'>Interest {loan.interest}</span>
            </div>{loan.status == 'succeed' ? null :
              <div className="footer">
                <button onClick={() => { setOpenModal(false); }} id="cancelBtn"> Cancel </button>
                <button >OK</button>
              </div>}
          </div>
        </div>
      )
}
