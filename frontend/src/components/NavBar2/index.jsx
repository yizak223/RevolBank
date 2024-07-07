import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import styles from './navbar2.module.css'
import { PathContext } from '../../context/Path'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import logo from '../../images/Black & White Minimalist Business Logo.png'

export default function NavBar2({ setmodalAcount, modalAcount }) {
    const { user, logOut } = useContext(UserContext)
    const { accounts, setChoosenAccount } = useContext(AccountContext)
    const { path, setPath } = useContext(PathContext)
    const [isNavBarOpen, setIsNavBarOpen] = useState(false)
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

    const toggleNavBar = () => {
        setIsNavBarOpen(prevState => !prevState)

        const ul = document.getElementById('ulNav')
        const header = document.getElementById('header')
        const nav = document.getElementById('navDevice')
        const openNavResponsive = document.getElementById('responsiveDevice')
        const closeNavResponsive = document.getElementById('closeNavResponsive')

        if (isNavBarOpen) {
            ul.style.display = 'none'
            ul.style.transition = 'display 0.2s ease-out'
            header.style.width = '5vw'
            header.style.transition = 'width 0.4s ease-out'
            nav.style.width = '5vw'
            nav.style.transition = 'width 0.4s ease-out'
            openNavResponsive.style.display = 'block'
            closeNavResponsive.style.display = 'none'
        } else {
            ul.style.display = 'flex'
            ul.style.transition = 'display 0.3s ease-out'
            header.style.width = '19vw'
            header.style.opacity = '1'
            header.style.transition = 'width 0.2s ease-out , opacity 0.4s ease-out'
            nav.style.width = '19vw'
            nav.style.transition = 'width 0.1s ease-out'
            openNavResponsive.style.display = 'none'
            closeNavResponsive.style.display = 'block'
        }
    }

    return (
        <header id='header' className={styles.header}>
            <nav id='navDevice' className={styles.nav}>
                <div onClick={toggleNavBar} className={styles.responsive}>
                    <div className={styles.hamburger}>
                        <FaBars id='responsiveDevice' />
                        <IoMdClose id='closeNavResponsive' className={styles.closeNav} />
                    </div>
                </div>
                <ul id='ulNav' className={styles.ul}>
                    <div>
                        <li><img className={styles.img} src={logo} alt="Logo" /></li>
                    </div>
                    <div className={styles.itemsNav}>
                        <Link className={`${styles.a} ${path === '/' ? styles.active : ''}`} to='/'>
                            <li className={styles.item}><i className="fa-solid fa-house"></i> Overview</li>
                        </Link>
                        <Link className={`${styles.a} ${path === '/balances' ? styles.active : ''}`} to='/balances'>
                            <li className={styles.item}><i className="fa-solid fa-wallet"></i> Activities</li>
                        </Link>
                        <Link className={`${styles.a} ${path === '/CreditCards' ? styles.active : ''}`} to='/CreditCards'>
                            <li className={styles.item}><i className="fa-regular fa-credit-card"></i> Credit Card</li>
                        </Link>
                        <Link className={`${styles.a} ${path === '/loans' ? styles.active : ''}`} to='/loans'>
                            <li className={styles.item}><i className="fa-solid fa-landmark"></i> Loan</li>
                        </Link>
                        <Link className={`${styles.a} ${path === '/transfers' ? styles.active : ''}`} to='/transfers'>
                            <li className={styles.item}><i className="fa-solid fa-money-bill-transfer"></i> Transfer</li>
                        </Link>
                    </div>
                    <div className={styles.user}>
                        {user && (
                            <>
                                <li onClick={() => setmodalAcount(!modalAcount)} className={`${styles.active} ${styles.item}`}>
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
