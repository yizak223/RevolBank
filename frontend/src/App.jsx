import { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
import Authntication from './pages/Authntication';
import CreditCard from './pages/CreditCards';
import Balances from './pages/Balances';
import './App.css';
import Loans from './pages/Loans';
import Transfers from './pages/Transfers';
import { UserContext } from './context/User';
import Menu from './pages/Menu';
import { PathContext } from './context/Path';
import DeviceHomePage from './pages/DeviceHome';
import styles from './app.module.css';
import About from './components/About';
import ResponsiveNav from './components/NavBarResponsive/ResponsiveNav';

function App() {
  const { user } = useContext(UserContext);
  const { setPath } = useContext(PathContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);


  return (
    <>
      <div className={user ? (screenWidth > 768 ? styles.containerPage1 : styles.containerPage2) : styles.containerPage2}>
        <BrowserRouter>
          {!user ? (
            <NavBar />
          ) : (
            <>
              {screenWidth < 768 ? (
                <ResponsiveNav />
              ) : (
                <NavBar2 />
              )}
            </>
          )}
          <Routes>
            {!user ? (
              <>
                <Route path="/authntication" element={<Authntication />} />
                <Route path="/" element={<About />} />
              </>
            ) : (
              <>
                <Route path="/" element={<DeviceHomePage />} />
                <Route path="/creditCards" element={<CreditCard />} />
                <Route path="/balances" element={<Balances />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/transfers" element={<Transfers />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
