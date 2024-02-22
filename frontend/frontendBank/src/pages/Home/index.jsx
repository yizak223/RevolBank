import React, { useContext, useState } from 'react'
import About from '../../components/About'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'
import BaseUrl from '../../config/BaseUrl'

export default function Home() {
  const { user, token } = useContext(UserContext)
  const { accounts } = useContext(AccountContext)
  const [createAccountMode, setCreateAccountMode] = useState(false)
  const [fullNameState, setfullNameState] = useState(user?.fullName || '');
  const [idIsraeli, setIdIsraeli] = useState('');
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState({
    fullName: fullNameState,
    balance: 0,
    idIsraeli: '',
    premium: false
  })

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
  const handleCancel = () => {
    setCreateAccountMode(!createAccountMode)
    setfullNameState(user.fullName || '');
    setBalance(0);
  };

  const urlAccount = `${BaseUrl}/accounts`
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(account);
    try {
      const res = await Axios.post(urlAccount, account, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
  return (
    <div>
      {user ?
        <>
          <h2>{accounts.length != 0 ?'Create another account':`Let's create your account`}</h2>
          <button onClick={() => setCreateAccountMode(!createAccountMode)}>Create account</button>
          {
            createAccountMode ?
              <div>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                  <h3>Full name: <input type="text" value={fullNameState} onChange={handleFullNameChange} /> </h3>
                  <h3>ID: <input type="number" value={idIsraeli} onChange={handleIdIsraeliChange} /></h3>
                  <h3>Balance: <input type="number" value={balance} onChange={handleBalanceChange} /></h3>
                  <select  onChange={handlePremiumChange}>
                    <option value="" disabled selected>Select subscription</option>
                    <option value={false}>Regular</option>
                    <option value={true}>Premium</option>
                  </select>
                  <button type="submit">Submit</button>
                </form>
              </div>
              : null
          }
        </>
        : null
      }
      <About />
    </div>
  )
}
