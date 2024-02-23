import React, { useState } from 'react'

export default function CreateAccount({
    handleSubmit,
    fullNameState,
    setfullNameState,
    account,setAccount
}) {
    const [idIsraeli, setIdIsraeli] = useState('');
    const [balance, setBalance] = useState(0);

    const handleFullNameChange = (event) => {
        setfullNameState(event.target.value);
        setAccount({ ...account, fullName: event.target.value });
    };

    const handleBalanceChange = (event) => {
        setBalance(event.target.value);
        setAccount({ ...account, balance: event.target.value });
    };
    const handleIdIsraeliChange = (event) => {
        setIdIsraeli(event.target.value);
        setAccount({ ...account, idIsraeli: event.target.value });
    };

    const handlePremiumChange = (event) => {
        const isPremium = event.target.value === 'true';
        setAccount({ ...account, premium: isPremium });
    }
    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <h3>Full name: <input type="text" value={fullNameState} onChange={handleFullNameChange} /> </h3>
                <h3>ID: <input type="number" value={idIsraeli} onChange={handleIdIsraeliChange} /></h3>
                <h3>Balance: <input type="number" value={balance} onChange={handleBalanceChange} /></h3>
                <select onChange={handlePremiumChange}>
                    <option value="" disabled selected>Select subscription</option>
                    <option value={false}>Regular</option>
                    <option value={true}>Premium</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
