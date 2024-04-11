import React, { useContext } from 'react'
import DeviceHome from '../../components/DeviceHome'
import NavBar2 from '../../components/NavBar2'
import styles from './DeviceHomePage.module.css'
import { PathContext } from '../../context/Path'

export default function DeviceHomePage() {
  const { path, setPath } = useContext(PathContext)

  console.log(path);

  return (
    <div >
        <DeviceHome />
    </div>
  )
}
