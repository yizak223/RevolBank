import React from 'react'
import styles from './balnces.module.css'

export default function NextBtn({ next, prev, setNext, setPrev }) {

    const nextBalance = () => {
        setNext(next + 7)
        setPrev(prev + 7)
    }

    return (
        <button className={styles.nextBtn} onClick={()=>{setNext(next + 7)
            setPrev(prev + 7)}}>Next</button>
    )
}
