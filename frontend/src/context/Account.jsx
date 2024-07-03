import React, { createContext, useEffect, useState, useContext } from 'react'
import { UserContext } from './User'
import Axios from 'axios'
import BaseUrl from '../config/BaseUrl'

export const AccountContext = createContext({})

export default function AccountProvider({ children }) {
  const { user, token, setToken } = useContext(UserContext)
  const [choosenAccount, setChoosenAccount] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [balanceuser, setBalanceuser] = useState('')

  const fetchData = async () => {
    try {
      const tokenLocal = localStorage.getItem('tokenLocal')
      setToken(tokenLocal)
      const idUser = user._id
      const urlAccounts = `${BaseUrl}/accounts?userId=${idUser}`
      const res = await Axios.get(urlAccounts,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setAccounts(res.data.accounts)
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
    }
  }
  useEffect(() => {
    if (user) {
      fetchData()

    }
  }, [user])
  useEffect(() => {
    setChoosenAccount(accounts[0])
  }, [accounts])
  useEffect(() => {
    setBalanceuser(choosenAccount?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

  }, [choosenAccount])
  const shared = { accounts, setAccounts, setChoosenAccount, choosenAccount, setBalanceuser, balanceuser }
  return (
    <AccountContext.Provider value={shared}>
      {/* <h1>{choosenAccount?.fullName}</h1> */}
      {children}
    </AccountContext.Provider>
  )
}
