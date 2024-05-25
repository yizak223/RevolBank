import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Menu.module.css'
export default function () {
    const navigate = useNavigate()

    return (
        <div className={styles.containerPage}>
            <div className={styles.containerMenu}>
                <div className={styles.containerBtns}>
                    <button className={styles.btn} onClick={() => { navigate('/loans') }}>Loans</button>
                    <button className={styles.btn} onClick={() => { navigate('/transfers') }}>Transfers</button>
                    <button className={styles.btn} onClick={() => { alert('building...') }}>Boonds</button>
                </div>
                <div className={styles.containerLogo}>
                    <img className={styles.img} src="src/images/KB.png" alt="" />
                </div>
            </div>

            {/* <div className='containerTranLoan'>
                <Loans />
                <Transfers/>
            </div> */}

        </div>
    )
}
