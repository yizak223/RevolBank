import React from 'react';
import { useSelector } from 'react-redux';
import DeviceHome from '../../components/DeviceHome';
import CreateAccount from '../../components/CreateAccount';

export default function DeviceHomePage() {
  const modalAcount = useSelector((state) => state.modal.modalAcount);

  const createAccountStyle = true

  return (
    <div>
      {modalAcount && <CreateAccount createAccountStyle={createAccountStyle} />}
      <DeviceHome />
    </div>
  );
}
