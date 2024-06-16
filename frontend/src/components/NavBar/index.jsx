import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PathContext } from '../../context/Path'
import styles from './navbar.module.css'
import { RegisterContext } from '../../context/RegisterMode'
import logo from '../../images/KB.png'

export default function navBar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname])

  console.log(logOrSign);
  return (
    <header>
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <img className={styles.img} src={logo} alt="" />
          <Link to='/' className={path == '/' ? styles.aHomeActive : styles.aHome}><p>REVOL-BANK</p></Link>
        </div>
        <div className={styles.container}>
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
      {/* <i class="fa-solid fa-bars"></i> */}

    </header>
  )
}
