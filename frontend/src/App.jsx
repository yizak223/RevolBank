import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import NavBar2 from './components/NavBar2'
import Authntication from './pages/Authntication'
import CreditCard from './pages/CreditCards'
import Balances from './pages/Balances'
import './App.css'
import Loans from './pages/Loans'
import Transfers from './pages/Transfers'
import { UserContext } from '../src/context/User'
import Menu from './pages/Menu'
import { PathContext } from './context/Path'
import DeviceHomePage from './pages/DeviceHome'
import styles from './app.module.css'
import About from './components/About'

function App() {
  const { user } = useContext(UserContext)
  const { setPath } = useContext(PathContext)
  const [modalAcount, setmodalAcount] = useState(false)
  
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname])

  return (
    <>
      <div className={!user ? styles.containerPage2 : styles.containerPage1}>
        <BrowserRouter >
          {
            !user ?
              <NavBar />
              : <NavBar2
                setmodalAcount={setmodalAcount}
                modalAcount={modalAcount} />
          }
          <Routes >
            {!user ?
              <>
                <Route path="/authntication" element={<Authntication />} />
                <Route path="/" element={<About />} />
              </>
              : <>
                <Route path="/" element={< DeviceHomePage setmodalAcount={setmodalAcount}
                modalAcount={modalAcount}  />} />
                <Route path='/creditCards' element={<CreditCard />} />
                <Route path='/balances' element={<Balances />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/loans' element={<Loans />} />
                <Route path='/transfers' element={<Transfers />} />
              </>
            }
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
