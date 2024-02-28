import React from 'react'
import DeviceHome from '../../components/DeviceHome'
import NavBar2 from '../../components/NavBar2'
import styles from './DeviceHomePage.module.css'

export default function DeviceHomePage() {
  return (
    <div className={styles.containerPage}>
        <NavBar2 />
        <DeviceHome />
    </div>
  )
}
