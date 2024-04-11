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

            {/* <label className={styles.label} htmlFor="terms">Enroll in Expo Developer Services</label> */}
            <button type="submit" className={styles.submitBtn}>Submit</button>
            <p className={styles.small}>Don't have acconout? <a onClick={() => setlogOrSign(!logOrSign)} className={styles.loginLink}>Sign up</a>.</p>
        </form>
    </div>
    )
}
//  <div>
//             <h1 className="titleSignUp">Log In</h1>
//             <form onSubmit={handleSubmit} className="AuthDiv">
//                 <input onChange={handleChange} className='logInInput' name='email' type="email" placeholder="email@email.com" required />
//                 <input onChange={handleChange} className='logInInput' name='password' type="password" placeholder="*****" required />
//                 <button className='btnSubmit'>Submit</button>
//                 <div >
//                     <p>Don't have acconout? </p>
//                     <p className="lgin-signup" onClick={() => setlogOrSign(!logOrSign)}> Sign up</p>
//                 </div>
//             </form>
//         </div>