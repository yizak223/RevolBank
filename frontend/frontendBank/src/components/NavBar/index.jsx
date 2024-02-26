import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../NavBar/navBar.css'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import { PathContext } from '../../context/Path'
import styles from './navbar.module.css'

export default function navBar() {
  const { user, logOut } = useContext(UserContext)
  const { accounts, choosenAccount, setChoosenAccount } = useContext(AccountContext)
  const { path, setPath } = useContext(PathContext)
  const location = useLocation()
  const [greeting, setGreeting] = useState('');


  // console.log(accounts);

  const handleOption = (e) => {
    setChoosenAccount(JSON.parse(e.target.value))
  }
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

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname])

  return (
    <header>
      <nav className="navBar">
        <Link onClick={() => { setPath('/') }} className={path === '/' ? 'nav-link active' : 'nav-link'} to="/">home</Link>
        {!user ?
          <Link onClick={() => { setPath('/authntication') }} className={path === '/authntication' ? 'nav-link active' : 'nav-link'} to="/authntication">log-in</Link>
          : <>
            <Link onClick={() => { setPath('/balances') }} className={path === '/balances' ? 'nav-link active' : 'nav-link'} to="/balances">activities</Link>
            <Link onClick={() => { setPath('/CreditCards') }} className={path === '/CreditCards' ? 'nav-link active' : 'nav-link'} to="/CreditCards">credit cards</Link>
            <Link onClick={() => { setPath('/menu') }} className={path === '/menu' ? 'nav-link active' : 'nav-link'} to="/menu">menu</Link>
          </>}
        {
          user ?
            <div className="containerLogUser">
              {/* <p className="UserHello">hello {user.fullName}</p> */}
              {
                choosenAccount ?
                  <h3 className="UserHello"> {choosenAccount?.fullName}</h3>
                  : <h1 className="UserHello">{user.fullName}</h1>
              }
              <div className="logoutBtnDiv">
                {
                  accounts.length != 0 ?
                    <>
                      <div>

                      </div>
                      <select className={styles.selectAccount} onChange={handleOption} name="account" >
                        <option value="" disabled selected>Change account</option>
                        {
                          accounts?.map((account, i) => (
                            <option key={i} value={JSON.stringify(account)}>{account.fullName}</option>
                          ))
                        }
                      </select>
                    </>
                    : null
                }
                <button className="logoutBtn" onClick={logOut}>Log out</button>
              </div>
            </div>
            : null
        }
      </nav>
    </header>
  )
}
