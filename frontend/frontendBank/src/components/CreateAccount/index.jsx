import React, { useState } from 'react'
import styles from './createAccount.module.css'

export default function CreateAccount({
    handleSubmit,
    fullNameState,
    setfullNameState,
    account, setAccount
}) {
    const [idIsraeli, setIdIsraeli] = useState('');
    const [balance, setBalance] = useState(0);

    const handleFullNameChange = (event) => {
        setfullNameState(event.target.value);
        setAccount({ ...account, fullName: event.target.value });
    };

    const handleBalanceChange = (event) => {
        setBalance(event.target.value);
        setAccount({ ...account, balance: event.target.value });
    };
    const handleIdIsraeliChange = (event) => {
        setIdIsraeli(event.target.value);
        setAccount({ ...account, idIsraeli: event.target.value });
    };

    const handlePremiumChange = (event) => {
        const isPremium = event.target.value === 'true';
        setAccount({ ...account, premium: isPremium });
    }
    return (
        <>
            <div className={styles.Container}>
                <form onSubmit={handleSubmit} className={styles.Form}>
                    <h2>Create your account</h2>
                    <input placeholder='Full name' className={styles.input} type="text" value={fullNameState} onChange={handleFullNameChange} />
                    <input placeholder='ID' className={styles.input} type="number" value={idIsraeli} onChange={handleIdIsraeliChange} />
                    <input placeholder='Balance' className={styles.input} type="number" value={balance} onChange={handleBalanceChange} />
                            <select className={styles.select} onChange={handlePremiumChange}>
                                <option className={styles.option} value="" disabled selected>Select subscription</option>
                                <option className={styles.option} value={false}>Regular</option>
                                <option className={styles.option} value={true}>Premium</option>
                            </select>
                        {/* <label className={styles.label} htmlFor="terms">Enroll in Expo Developer Services</label> */}
                    <button type="submit" className={styles.submitBtn}>Create your account</button>
                    <small className={styles.small}>By creating an account you agree to our <a href="#" className={styles.loginLink}>Terms of Service and Privacy Policy</a>.</small>
                </form>
            </div>
            {/* <div className={styles.container}>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>//
                    <div className={styles.formGroup}>
                      77  <input placeholder='Full name' className={styles.input} type="text" value={fullNameState} onChange={handleFullNameChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <input placeholder='ID' className={styles.input} type="number" value={idIsraeli} onChange={handleIdIsraeliChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <input placeholder='Balance' className={styles.input} type="number" value={balance} onChange={handleBalanceChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Subscription:</label>
                        <select onChange={handlePremiumChange}>
                            <option value="" disabled selected>Select subscription</option>
                            <option value={false}>Regular</option>
                            <option value={true}>Premium</option>
                        </select>
                    </div>
                    <button className={styles.submitbtn} type="submit">Submit</button>
                </form>
            </div> */}
        </>
    )
}

/*   <div className={styles.signupContainer}>
      <header className={styles.header}>
        <h1>Expo</h1>
        <a href="#" className={styles.loginLink}>Log in</a>
      </header>
      <form className={styles.signupForm}>
        <h2>Create your account</h2>
        <p>Create an account to view and manage your projects.</p>
        <input type="email" id="email" placeholder="Email" className={styles.input} />
        <input type="text" id="username" placeholder="Username" className={styles.input} />
        <input type="password" id="password" placeholder="Password" className={styles.input} />
        <input type="password" id="confirm-password" placeholder="Confirm password" className={styles.input} />
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" id="terms" className={styles.input} />
          <label htmlFor="terms">Enroll in Expo Developer Services</label>
        </div>
        <button type="submit" className={styles.submitBtn}>Create your account</button>
        <small>By creating an account you agree to our <a href="#" className={styles.loginLink}>Terms of Service and Privacy Policy</a>.</small>
      </form>
    </div>   */