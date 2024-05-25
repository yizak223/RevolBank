import React, { useContext, useEffect, useState } from 'react'
import About from '../../components/About'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import Axios from 'axios'
import BaseUrl from '../../config/BaseUrl'
import CreateAccount from '../../components/CreateAccount'
import styles from './home.module.css'
import styles2 from '../../components/About/about.module.css'

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
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const currentTime = new Date().getHours();

      if (currentTime >= 5 && currentTime < 12) {
        setGreeting('Good Morning');
      } else if (currentTime >= 12 && currentTime < 17) {
        setGreeting('Good Afternoon');
      } else if (currentTime >= 17 && currentTime < 20) {
        setGreeting('Good Evening');
      } else {
        setGreeting('Good Night');
      }
    };

    getGreeting();

    // Update the greeting every minute
    const interval = setInterval(getGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

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
    <div className={styles.homeComponent}>
      {user ?
        <>
          {/* <div> */}
            {/* <h1>Here will show</h1>
            <h1>1.concentration of balances</h1>
            <h1>2.Billing next month</h1>
            <h1>3.your charges and payments</h1> */}
          {/* </div> */}
          <div className={styles.About}>
            <div className={styles2.left}>
              <h1 className={
                greeting === 'Good Morning' ? styles.morning :
                  greeting === 'Good Afternoon' ? styles.afternoon :
                    styles.evening}>
                {greeting} {user?.fullName.split(' ')[0]}</h1>
              {
                choosenAccount ?
                  <div className={styles.accountbalance}>
                    <h2 >{balanceuser}</h2>
                    <span>the current account balance</span>
                  </div> : null
              }
              {accounts.length < 3 ?
                <>
                  <div className={styles.createAccountContainer}>
                    <h2 className={styles.createAccount}>{accounts.length != 0 ? 'Create another account' : `Let's create your account`}</h2>
                    <button className={createAccountMode ? styles.btnCreateClosa : styles.btnCreate}onClick={() => setCreateAccountMode(!createAccountMode)}>{!createAccountMode ? 'Create account' : 'cancel'}</button>
                  </div>

                </> : 
                <div className={styles.accountbalance}>
                  <h2 >0</h2>
                    <span>Charges for the coming month</span>

                </div>
              }
            </div>
            <div className={styles2.right}>
              {
                createAccountMode ?
                  <div className={styles.container}>
                    <CreateAccount setAccount={setAccount} account={account}
                      setfullNameState={setfullNameState} fullNameState={fullNameState}
                      handleSubmit={handleSubmit} />
                  </div>
                   : <img className={styles2.img} src="src/images/KB.png" alt="" />
              }
            </div>

          </div>
        </> : <About />
      }

    </div>
  )
}
