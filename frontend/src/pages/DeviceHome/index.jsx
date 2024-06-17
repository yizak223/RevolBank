import React, { useContext } from 'react'
import DeviceHome from '../../components/DeviceHome'
import CreateAccount from '../../components/CreateAccount'
import ModalAlert from '../../components/ModalAlert'

export default function DeviceHomePage({ setmodalAcount, modalAcount }) {
  return (
    <div >
      {
        modalAcount ?
          <>
            <CreateAccount setmodalAcount={setmodalAcount} modalAcount={modalAcount} />
          </>
          :
          null
      }
      <DeviceHome />
    </div>
  )
}
