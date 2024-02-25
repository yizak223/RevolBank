import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Authntication from './pages/Authntication'
import CreditCard from './pages/CreditCards'
import BigCreditCard from './components/BigCreditCard'
import Balances from './pages/Balances'
import './App.css'
import Loans from './pages/Loans'
import BigLoan from './components/BigLoan'
import BigTransfer from './components/BigTransfer'
import Transfers from './pages/Transfers'
import { UserContext } from '../src/context/User'
import Menu from './pages/Menu'

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user ?
            <Route path="/authntication" element={<Authntication />} />
            : <>
              <Route path='/creditCards' element={<CreditCard />} />
              <Route path='/creditCards/:id' element={<BigCreditCard />} />
              <Route path='/balances' element={<Balances />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/loans' element={<Loans />} />
              <Route path='/loans/:id' element={<BigLoan />} />
              <Route path='/transfers' element={<Transfers />} />
              <Route path='/transfers/:id' element={<BigTransfer />} />
            </>
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
