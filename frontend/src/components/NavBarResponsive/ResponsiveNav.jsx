import React, { useContext, useEffect, useState } from 'react'
import styles from './ResponsiveNav.module.css'
import styles2 from '../NavBar2/navbar2.module.css'
import { UserContext } from '../../context/User'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AccountContext } from '../../context/Account'
import { PathContext } from '../../context/Path'
import { FaBars } from 'react-icons/fa6'
import logo from '../../images/KB.png'


export default function ResponsiveNav({ setmodalAcount, modalAcount }) {
    const { user, logOut } = useContext(UserContext)
    const { accounts, setChoosenAccount } = useContext(AccountContext)
    const { path, setPath } = useContext(PathContext)
    const [isNavBarOpen, setIsNavBarOpen] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setPath(location.pathname)
    }, [location.pathname, setPath])

    const handleOption = (e) => setChoosenAccount(JSON.parse(e.target.value))
    const handleLogOut = () => {
        logOut()
        navigate('/')
        setPath('/')
    }

    const openNavBar = () => {
        setIsNavBarOpen(prevState => !prevState)
        const header = document.getElementById('headerResponsive')
        const ul = document.getElementById('ulNav')
        if (isNavBarOpen) {
            header.style.height = '65vh'
            header.style.transition = 'height 0.2s ease-out'
            ul.style.opacity = '1'
            ul.style.height = '70vh'
            ul.style.display = 'block'
            ul.style.transition = 'height 0.1s ease-out '
            ul.style.transitionDelay = ' display 0.2s ease-out'
        } else {
            header.style.height = '10vh'
            header.style.transition = 'height 0.5s ease-out'
            ul.style.opacity = '0'
            ul.style.height = '0'
            ul.style.display = 'none'
            ul.style.transition = 'height 0.5s ease-out'
            ul.style.transitionDelay = ' display 0.5s ease-out'
        }
    }

    return (
        <header id='headerResponsive' className={styles.header}>
            <nav className={styles.nav}>
                <div onClick={openNavBar} className={styles.responsive}>
                    <img className={styles.img} src={logo} alt="" />
                    <div className={styles.hamburger}>
                        <FaBars />
                    </div>
                </div>
                <ul id='ulNav' className={styles.ul}>
                    <div id='itesmNav' className={styles.itemsNav}>
                        <Link className={`${styles2.a} ${path === '/' ? styles.active : ''}`} to='/'>
                            <li className={styles2.item}><i className="fa-solid fa-house"></i> Overview</li>
                        </Link>
                        <Link className={`${styles2.a} ${path === '/balances' ? styles.active : ''}`} to='/balances'>
                            <li className={styles2.item}><i className="fa-solid fa-wallet"></i> Activities</li>
                        </Link>
                        <Link className={`${styles2.a} ${path === '/CreditCards' ? styles.active : ''}`} to='/CreditCards'>
                            <li className={styles2.item}><i className="fa-regular fa-credit-card"></i> Credit Card</li>
                        </Link>
                        <Link className={`${styles2.a} ${path === '/loans' ? styles.active : ''}`} to='/loans'>
                            <li className={styles2.item}><i className="fa-solid fa-landmark"></i> Loan</li>
                        </Link>
                        <Link  className={`${styles2.a} ${path === '/transfers' ? styles.active : ''}`} to='/transfers'>
                            <li className={styles2.item}><i className="fa-solid fa-money-bill-transfer"></i> Transfer</li>
                        </Link>
                    </div>
                    <div className={styles.user}>
                        {user && (
                            <>
                                <li onClick={() => setmodalAcount(!modalAcount)} className={`${styles.active} ${styles2.item}`}>
                                    <i className="fa-regular fa-user"></i> {user.fullName.split(' ')[0]}
                                </li>
                                {accounts.length > 0 ? (
                                    <select className={styles.select} onChange={handleOption} name="account">
                                        <option value="" disabled>Change account</option>
                                        {accounts.map((account, i) => (
                                            <option key={i} value={JSON.stringify(account)}>{account.idIsraeli}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>Create account</p>
                                )}
                                <button onClick={handleLogOut} className={styles.logOutBtn}>Log out</button>
                            </>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    )
}
