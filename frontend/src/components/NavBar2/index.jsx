import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './navbar2.module.css'
import { PathContext } from '../../context/Path'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/Black & White Minimalist Business Logo.png'
// import { FaBars } from 'react-icons/fa6'

export default function NavBar2({ setmodalAcount, modalAcount }) {
    const { user, logOut } = useContext(UserContext)
    const { accounts, setChoosenAccount } = useContext(AccountContext)
    const { path, setPath } = useContext(PathContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleOption = (e) => {
        setChoosenAccount(JSON.parse(e.target.value))
    }

    const handleLogOut = () => {
        logOut()
        navigate('/')
        setPath('/')
    }

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname])

    return (
        <header>
            <nav className={styles.nav}>
                {/* <div  className={styles.responsive}>
                    <div className={styles.hamburger}>
                        <FaBars />
                    </div>
                </div> */}
                <ul className={styles.ul}>
                    <div>
                        <li><img className={styles.img} src={logo} alt="" /></li>
                    </div>
                    <div className={styles.itemsNav}>
                        <Link className={`${styles.a} ${path === '/' ? styles.active : ''}`} to='/'><li className={`$ ${styles.item}`}><i className="fa-solid fa-house"></i>Overview</li></Link>
                        <Link className={`${styles.a} ${path === '/balances' ? styles.active : ''}`} to='/balances'><li className={styles.item}><i className="fa-solid fa-wallet"></i>activities</li></Link>
                        <Link className={`${styles.a} ${path === '/CreditCards' ? styles.active : ''}`} to='/CreditCards'><li className={styles.item}><i className="fa-regular fa-credit-card"></i>credit card</li></Link>
                        <Link className={`${styles.a} ${path === '/loans' ? styles.active : ''}`} to='/loans'><li className={styles.item}><i className="fa-solid fa-landmark"></i>loan</li></Link>
                        <Link className={`${styles.a} ${path === '/transfers' ? styles.active : ''}`} to='/transfers'><li className={styles.item}><i className="fa-solid fa-money-bill-transfer"></i>transfer</li></Link>
                    </div>
                    <div className={styles.user}>
                        {
                            user ?
                                <>
                                    <li onClick={() => setmodalAcount(!modalAcount)} className={`${styles.active} ${styles.item}`}><i className="fa-regular fa-user"></i>{user.fullName.split(' ')[0]}</li>
                                    {accounts.length != 0 ?
                                        <>
                                            <select className={styles.select} onChange={handleOption} name="account" >
                                                <option value="" disabled >Change account</option>
                                                {accounts?.map((account, i) => (
                                                    <option key={i} value={JSON.stringify(account)}>{account.idIsraeli}</option>
                                                ))}
                                            </select>
                                        </> : <p>create account</p>
                                    }
                                    <button onClick={handleLogOut} className={styles.logOutBtn}>Log out</button>
                                </>
                                : null
                        }
                    </div>
                </ul>
            </nav>
        </header>
    )
}
