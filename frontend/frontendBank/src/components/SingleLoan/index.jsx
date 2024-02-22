import React from 'react'
import './SingleLoan.css'

export default function SingleLoan({ loan }) {
  const dateObj = new Date(loan.dueDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return (
    <div className='singleLoan'>
      <h3>Amount: {loan.amount}</h3>
      <h3>Final pay: {loan.finalAmount}</h3>
      <h3>Date to pay: {formattedDateTime}</h3>
      <h3>Status: {loan.status}</h3>
    </div>
  )
}
