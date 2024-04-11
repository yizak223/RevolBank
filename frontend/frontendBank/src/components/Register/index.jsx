import React, { useContext } from 'react'
import styles from '../CreateAccount/createAccount.module.css'
import './register.module.css'
import { RegisterContext } from '../../context/RegisterMode'

export default function Register({ handleSubmit, handleChange, emailExist }) {
    const { logOrSign, setlogOrSign } = useContext(RegisterContext)

    return (
        <>
            <div >
                <form onSubmit={handleSubmit} className={styles.Form}>
                    <h2 className={styles.h2}>Register</h2>
                    <input className={styles.input} onChange={handleChange} name='fullName' type="name" placeholder="Full name" required />
                    {emailExist ?
                        <>
                            <p>this email already in use</p>
                        </>
                        : null}
                    <input className={styles.input} onChange={handleChange} name='email' type="email" placeholder="email@email.com" required />
                    <input className={styles.input} onChange={handleChange} name='password' type="password" placeholder="*****" required />
                    <button type="submit" className={styles.submitBtn}>Create your account</button>
                    <p className={styles.small}>By creating an account you agree to our <a href="#" className={styles.loginLink}>Terms of Service and Privacy Policy</a>.</p>
                    <p className={styles.small}>Have an acconout? <a onClick={() => setlogOrSign(!logOrSign)} className={styles.loginLink}>Log in</a>.</p>
                </form>
            </div>
        </>
    )
}
