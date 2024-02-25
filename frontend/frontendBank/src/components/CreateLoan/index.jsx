import React, { useContext, useState } from 'react'
import { AccountContext } from '../../context/Account'
import { UserContext } from '../../context/User'
import Axios from 'axios'
import baseUrl from '../../config/BaseUrl'

export default function CreateLoan({ Loans, setLoans }) {
    const { accounts, setBalanceuser } = useContext(AccountContext)
    const { token } = useContext(UserContext)
    const [createLoan, setCreateLoan] = useState(false)
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
            <button onClick={() => { setCreateLoan(!createLoan) }}>Create Loan</button>
            {
                createLoan ?
                    <>
                        <form onSubmit={submitHandler}>
                            <h1>create loan</h1>
                            <select required onChange={handleChange} name="idAccount" >
                                <option value="" disabled selected>Select account</option>
                                {accounts?.map((account, i) => (
                                    <option key={i} value={account._id}>{account.fullName}</option>
                                ))}
                            </select><br />
                            <label htmlFor="amount">how much you want to loan?</label><br />
                            <input name='amount' type="number" placeholder='how much?' value={Loan.amount} onChange={handleChange} /><br />
                            <input
                                name='dueDate'
                                type="date"
                                value={dueDateState.toISOString().split('T')[0]} // Extracting yyyy-mm-dd from the ISO string
                                onChange={handleChange}
                                // onkeydown="return false"
                                onKeyDown={(e) => e.preventDefault()}
                                onFocus={(e) => e.target.blur()} // Blur the input field when it's focused to prevent manual input
                            />
                            <br />
                            <label htmlFor="interest">Interest</label><br />
                            <input readOnly name='interest' type="number" value={0.04} /><br />
                            <label htmlFor="monthlyPayment">Monthly payment</label><br />
                            <input readOnly name='everyMonth' type="number" value={Loan.everyMonth} /><br />
                            <label htmlFor="finalAmount">Final amount</label><br />
                            <input readOnly type="number" value={finalAmountState} />
                            <button>Request loan</button>
                        </form>
                    </>
                    : null}
        </>
    )
}
