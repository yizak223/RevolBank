import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalAcount } from '../../redux/store'
import styles from './createAccount.module.css'
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';
import baseUrl from '../../config/BaseUrl';
import Axios from 'axios';

export default function CreateAccount({createAccountStyle}) {
    const dispatch = useDispatch();
    const modalAcount = useSelector((state) => state.modal.modalAcount);

    const { user, token } = useContext(UserContext)
    const { accounts, setAccounts } = useContext(AccountContext)
    const [fullNameState, setfullNameState] = useState(user?.fullName || '');
    const [account, setAccount] = useState({
        fullName: fullNameState,
        balance: 0,
        idIsraeli: '',
        premium: false
    })
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
    const urlAccount = `${baseUrl}/accounts`
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await Axios.post(urlAccount, account, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccounts([...accounts, res.data.newAccount]);
            dispatch(setModalAcount(!modalAcount))
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="modalBackground">
            <div className={createAccountStyle? styles.ContainerHome : styles.containerOtherPage}>
                <form onSubmit={handleSubmit} className={styles.Form}>
                    <h2 className={styles.h2}>Create your account</h2>
                    <input required placeholder='Full name' className={styles.input} type="text" value={fullNameState} onChange={handleFullNameChange} />
                    <input required placeholder='ID' className={styles.input} type="number" value={idIsraeli} onChange={handleIdIsraeliChange} />
                    <label >How much do you want to deposit?</label>
                    <input required placeholder='Balance' className={styles.input} type="number" onChange={handleBalanceChange} />
                    <select className={styles.select} onChange={handlePremiumChange}>
                        <option className={styles.option} value="" disabled selected>Select subscription</option>
                        <option className={styles.option} value={false}>Regular</option>
                        <option className={styles.option} value={true}>Premium</option>
                    </select>
                    <button type="submit" className={styles.submitBtn}>Create</button>
                    <small className={styles.small2}>By creating an account you agree to our <a href="#" className={styles.loginLink}>Terms of Service and Privacy Policy</a>.</small>
                </form>
                <button onClick={() => dispatch(setModalAcount(!modalAcount))} className={styles.cancel2}> Cancel </button>
            </div>
        </div>
    )
}
