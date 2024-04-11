import React, { useContext } from 'react'
import styles from '../CreateAccount/createAccount.module.css'
import { RegisterContext } from '../../context/RegisterMode'

export default function LogIn({ handleSubmit, handleChange }) {
    const { logOrSign, setlogOrSign } = useContext(RegisterContext)

    return (
        <div >
        <form onSubmit={handleSubmit} className={styles.Form}>
            <h2 className={styles.h2}>LOG-IN</h2>
            <input className={styles.input} onChange={handleChange} name='email' type="email" placeholder="email@email.com" required />
            <input className={styles.input} onChange={handleChange} name='password' type="password" placeholder="*****" required />
            <button type="submit" className={styles.submitBtn}>Submit</button>
            <p className={styles.small}>Don't have acconout? <a onClick={() => setlogOrSign(!logOrSign)} className={styles.loginLink}>Sign up</a>.</p>
        </form>
    </div>
    )
}
