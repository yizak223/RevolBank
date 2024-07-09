import React from 'react'
import styles from './balnces.module.css'

export default function PrevBtn({ next, prev, setNext, setPrev }) {

    const prevBalance = () => {
        setNext(next - 7)
        setPrev(prev - 7)
    }

    return (
        <button className={styles.prevBtn} onClick={prevBalance}>Prev</button>
    )
}
