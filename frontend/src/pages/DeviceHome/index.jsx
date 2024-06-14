import React, { useContext } from 'react'
import DeviceHome from '../../components/DeviceHome'
import CreateAccount from '../../components/CreateAccount'

export default function DeviceHomePage({setmodalAcount, modalAcount}) {
  console.log({modalAcount});
  return (
    <div >
      {
        modalAcount ?
          <CreateAccount setmodalAcount={setmodalAcount} modalAcount={modalAcount} />
          :
          null
      }
      <DeviceHome />
    </div>
  )
}
