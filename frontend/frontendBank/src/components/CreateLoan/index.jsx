import React, { useContext, useState } from 'react'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import Axios from 'axios'
import baseUrl from '../../config/BaseUrl'
import styles from './createLoan.module.css'
// import style from '../CreateAccount/createAccount.module.css'

export default function CreateLoan({ Loans, setLoans, setCreateLoan, createLoan }) {
    const { accounts, setBalanceuser } = useContext(AccountContext)
    const { token } = useContext(UserContext)
    const today = new Date();
    const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
    // console.log(twoMonthsLater);

    // const timeDiff = twoMonthsLater.getTime() - today.getTime();
    // const months = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
    const [dueDateState, setDueDateState] = useState(twoMonthsLater)
    const [amountState, setAmountState] = useState(1000)
    const [finalAmountState, setFinalAmountState] = useState(1040)
    const [monthlyPaymentState, setmonthlyPaymentState] = useState(
        (amountState * 1.04) / Math.ceil((dueDateState.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30))
    )
    const [Loan, setLoan] = useState({
        idAccount: '',
        amount: amountState,
        dueDate: dueDateState,
        finalAmount: finalAmountState,
        everyMonth: monthlyPaymentState,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newAmount = Loan.amount;
        let newDueDate = dueDateState;

        if (name === 'amount') {
            newAmount = value;
        } else if (name === 'dueDate') {
            newDueDate = new Date(value);
        } else if (name === 'idAccount') {
            Loan[e.target.name] = e.target.value
        }

        const timeDiff = newDueDate.getTime() - today.getTime();
        const months = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
        const newEveryMonth = (newAmount * 1.04) / months;

        setLoan(prevLoan => ({
            ...prevLoan,
            amount: newAmount,
            dueDate: newDueDate,
            finalAmount: newAmount * 1.04,
            everyMonth: newEveryMonth.toFixed(2) // Rounded to two decimal places
        }));
        setDueDateState(newDueDate);
        setFinalAmountState(newAmount * 1.04)
        console.log(Loan);
    };
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(Loan);
        console.log(token);
        try {
            const res = await Axios.post(`${baseUrl}/loans`, Loan, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data.newLoan);
            setLoans([...Loans, res.data.newLoan])
            setCreateLoan(!createLoan)
            setBalanceuser(prevBalance => Number(prevBalance.replace(/,/g, "")) + Number(res.data.newLoan.amount));
            setBalanceuser(prevBalance => prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            console.log(res);
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
        }
    }

    // console.log(dueDateState.getTime());
    // console.log((amountState * 1.04));

    return (
        <>
      <div className={styles.Container}>
        <form onSubmit={submitHandler} className={styles.Form}>
                <h2 className={styles.h2}>create loan</h2>
                <select className={styles.select} required onChange={handleChange} name="idAccount" >
                    <option value="" disabled selected>Select account</option>
                    {accounts?.map((account, i) => (
                        <option key={i} value={account._id}>{account.fullName}</option>
                    ))}
                </select><br />
                <label className={styles.label} htmlFor="amount"> <p>how much you want to loan?</p></label>
                <input className={styles.input} name='amount' type="number" placeholder='how much?' value={Loan.amount} onChange={handleChange} /><br />
                <input className={styles.input}
                    name='dueDate'
                    type="date"
                    value={dueDateState.toISOString().split('T')[0]} // Extracting yyyy-mm-dd from the ISO string
                    onChange={handleChange}
                    // onkeydown="return false"
                    onKeyDown={(e) => e.preventDefault()}
                    onFocus={(e) => e.target.blur()} // Blur the input field when it's focused to prevent manual input
                />
                <br />
                  <label className={styles.label} htmlFor="interest"><p>Interest</p></label>
                <input className={styles.input} readOnly name='interest' type="number" value={0.04} /><br />
                <label className={styles.label} htmlFor="monthlyPayment"><p>Monthly payment</p></label>
                <input className={styles.input} readOnly name='everyMonth' type="number" value={Loan.everyMonth} /><br />
                <label className={styles.label} htmlFor="finalAmount"><p>Final amount</p></label>
                <input className={styles.input} readOnly type="number" value={finalAmountState} />
                <button className={styles.submitBtn}>Request loan</button>
            </form>
      </div>
            
        </>
    )
}
