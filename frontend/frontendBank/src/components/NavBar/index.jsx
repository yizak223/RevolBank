import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../NavBar/navBar.css'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'

export default function navBar() {
  const { user, logOut } = useContext(UserContext)
  const { accounts, choosenAccount, setChoosenAccount } = useContext(AccountContext)
  // console.log(accounts);

  const handleOption = (e) => {
    setChoosenAccount(JSON.parse(e.target.value))
  }
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {!user ?
          <Link to="/Authntication">log-in</Link>
          : <>
            <Link to="/Balances">Balances</Link>
            <Link to="/CreditCards">Credit cards</Link>
            <Link to="/menu">menu</Link>
          </>}

      </nav>
      {
        user ? <>
          <h1>Hello {user?.fullName}</h1>
          {
            choosenAccount ?
              <h3>Account: {choosenAccount?.idIsraeli}</h3>
              : null
          }
          <button onClick={logOut}>Log out</button><br />

          {
            accounts.length != 0 ? <>
              <select onChange={handleOption} name="account" >
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


        </>
          : null
      }

    </header>
  )
}
