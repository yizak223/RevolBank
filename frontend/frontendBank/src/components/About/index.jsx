import React from 'react'
import styles from './about.module.css'

export default function About() {
  return (
    <div className={styles.About}>
      <div className={styles.left}>
      <h1 className={styles.h1}>You deserve a bank that wants you <span className={styles.span}>extra!</span></h1>
      </div>
      <div className={styles.right}>
        <img className={styles.img} src="src/images/KB.png" alt="" />
      </div>
    </div>
  )
}
