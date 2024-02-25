import React, { useContext, useEffect, useState } from 'react'
import About from '../../components/About'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'
import BaseUrl from '../../config/BaseUrl'
import CreateAccount from '../../components/CreateAccount'
import './home.css'

export default function Home() {
  const { user, token } = useContext(UserContext)
  const { accounts, setAccounts, choosenAccount, balanceuser } = useContext(AccountContext)
  const [createAccountMode, setCreateAccountMode] = useState(false)
  const [fullNameState, setfullNameState] = useState(user?.fullName || '');
  const [account, setAccount] = useState({
    fullName: fullNameState,
    balance: 0,
    idIsraeli: '',
    premium: false
  })


  // const handleCancel = () => {
  //   setCreateAccountMode(!createAccountMode)
  //   setfullNameState(user.fullName || '');
  //   setBalance(0);
  // };

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
      setAccounts([...accounts, res.data.newAccount]);
      setCreateAccountMode(!createAccountMode)
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div>
      {user ?
        <>{
          choosenAccount ?
            <div className='accountbalance'>
              <h2 >{balanceuser}</h2>
              <span>the current account balance</span>
            </div> : null
        }

          {accounts.length < 2 ?
            <>
              <h2>{accounts.length != 0 ? 'Create another account' : `Let's create your account`}</h2>
              <button onClick={() => setCreateAccountMode(!createAccountMode)}>{!createAccountMode ? 'Create account' : 'cancel'}</button>
              {
                createAccountMode ?
                  <CreateAccount setAccount={setAccount} account={account}
                    setfullNameState={setfullNameState} fullNameState={fullNameState}
                    handleSubmit={handleSubmit} /> : null
              }
            </> : null
          }
          <div>
            <h1>Here will show</h1>
            <h1>1.concentration of balances</h1>
            <h1>2.Billing next month</h1>
            <h1>3.your charges and payments</h1>
          </div>
        </> : <About />
      }

    </div>
  )
}
