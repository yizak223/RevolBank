import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import NavBar2 from './components/NavBar2'
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
import { PathContext } from './context/Path'
import DeviceHomePage from './pages/DeviceHome'
import styles from './app.module.css'

function App() {
  const { user } = useContext(UserContext)
  const { path } = useContext(PathContext)

  // useEffect(() => {
  //   setPath(location.pathname);
  // }, [location.pathname])
  return (
    <>
    <div className={styles.containerPage}>
      <BrowserRouter >
        {/* {
          path === '/'?
          <NavBar2/>
          
        } */}
        {/* {
          path === '/h' ?
            null : <NavBar />\
        } */}
        {/* <NavBar /> */}
            <NavBar2 />
        <Routes >
            <Route path="/overView" element={< DeviceHomePage />} />
          <Route path="/" element={<Home />} />
          {!user ?
            <Route path="/authntication" element={<Authntication />} />
            : <>
              <Route path='/creditCards' element={<CreditCard />} />
              {/* <Route path='/creditCards/:id' element={<BigCreditCard />} /> */}
              <Route path='/balances' element={<Balances />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/loans' element={<Loans />} />
              {/* <Route path='/loans/:id' element={<BigLoan />} /> */}
              <Route path='/transfers' element={<Transfers />} />
              {/* <Route path='/transfers/:id' element={<BigTransfer />} /> */}
            </>
          }
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
