import React from 'react'
import styles from './about.module.css'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const location = useNavigate()
  return (
    <div className={styles.About}>
      <div className={styles.left}>
        <h1 className={styles.h1}>You deserve a bank that wants you <span className={styles.span}>extra!</span></h1>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <h2>Cheaper loans</h2>
            <img className={styles.imgloans} src="https://time4me.co.il/wp-content/uploads/2023/07/image-1410.png" alt="" />
          </div>
          <div className={styles.advantage}>
            <h2>Free transfers</h2>
            <img className={styles.imgtransfers} src="https://upload.wikimedia.org/wikipedia/he/thumb/d/d6/Bit_logo.svg/800px-Bit_logo.svg.png" alt="" />
          </div>
          <div className={styles.advantage}>
            <h2>The best service</h2>
            <img className={styles.imgservice} src="https://alltips.co.il/wp-content/uploads/2017/09/call-customer-service.png" alt="" />
          </div>
        </div>
        <div className={styles.containerBtn}>
          <button onClick={()=>{location('/authntication')}} className={styles.btn}>Create Account</button>
        </div>
      </div>
      <div className={styles.right}>
        <img className={styles.img} src="src/images/KB.png" alt="" />
      </div>
    </div>
  )
}
