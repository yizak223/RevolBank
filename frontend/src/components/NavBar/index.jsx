import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PathContext } from '../../context/Path'
import styles from './navbar.module.css'
import { RegisterContext } from '../../context/RegisterMode'
import logo from '../../images/KB.png'
import { FaBars } from "react-icons/fa6";

export default function navBar() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { setlogOrSign, logOrSign } = useContext(RegisterContext)
  const { path, setPath } = useContext(PathContext)
  const location = useLocation()

  const handleSignIn = () => {
    setlogOrSign(false)
    setPath('/authntication')
  }

  const handleSignUp = () => {
    setlogOrSign(true)
    setPath('/authntication')
  }

  const openNavBar = () => {
    if (!isNavBarOpen) {
      setIsNavBarOpen(true)
      const aHome = document.getElementById('revolBankLink');
      const navbar = document.getElementById('navbar')
      const container = document.getElementById('container')
      if (navbar) {
        navbar.style.height = '260px';
        navbar.style.transition = 'height 0.5s ease-out, opacity 0.5s ease-out'; 
      }
      if (aHome) {
        aHome.style.maxHeight = '100%';
        aHome.style.opacity = '1'; 
        aHome.style.transition = 'max-width 0.5s ease-out, opacity 0.5s ease-out'; 
      }
      if (container) {
        container.style.height = '100%';
        container.style.opacity = '1'
        container.style.transition = 'height 0.5s ease-out, opacity 0.5s ease-out'; 
      }
    } else {
      setIsNavBarOpen(false)
      const aHome = document.getElementById('revolBankLink');
      const navbar = document.getElementById('navbar')
      const container = document.getElementById('container')
      if (container) {
        container.style.height = '0%';
        container.style.opacity = '0'
        container.style.transition = 'height 0.3s ease-out, opacity 0.1s ease-out'; 
      }
      if (navbar) {
        navbar.style.height = '90px';
        navbar.style.transition = 'height 0.3s ease-out, opacity 0.1s ease-out'; 
      }
      if (aHome) {
        aHome.style.maxHeight = '0%';
        aHome.style.opacity = '0'; 
        aHome.style.transition = 'max-width 0.3s ease-out'; 
      }
    }

  }

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname])

  return (
    <header>
      <nav id='navbar' className={styles.navBar}>
        <div className={styles.logo}>
          <div onClick={openNavBar} className={styles.responsive}>
            <img className={styles.img} src={logo} alt="" />
            <div className={styles.hamburger}>
            <FaBars/>
            </div>
          </div>
          <Link
            to='/'
            id="revolBankLink"
            className={path == '/' ? styles.aHomeActive : styles.aHome}><p>REVOL-BANK</p></Link>
        </div>
        <div id='container' className={styles.container}>
          {
            path == '/authntication' ?
              <>
                <Link className={logOrSign ? styles.a : styles.aActive} onClick={handleSignIn} to="/authntication">
                  <div className={!logOrSign ? styles.navActive : styles.navlink}>
                    <li> Log-in</li>
                  </div>
                </Link>
                <Link className={!logOrSign ? styles.a : styles.aActive} onClick={handleSignUp} to="/authntication">
                  <div className={logOrSign ? styles.navActive : styles.navlink}>
                    <li> Sign-up</li>
                  </div>
                </Link>

              </>
              :
              <>
                <Link className={styles.a} onClick={handleSignIn} to="/authntication">
                  <div className={styles.navlink}>
                    <li> Log-in</li>
                  </div>
                </Link>
                <Link className={styles.a} onClick={handleSignUp} to="/authntication">
                  <div className={styles.navlink}>
                    <li> Sign-up</li>
                  </div>
                </Link>
              </>
          }
        </div>
      </nav>
    </header>
  )
}
