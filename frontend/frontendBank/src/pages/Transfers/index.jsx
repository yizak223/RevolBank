import React, { useContext, useEffect, useState } from 'react'
import SingleTransfer from '../../components/SingleTransfer'
import CreateTransfer from '../../components/CreateTransfer'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import ModalTransfer from '../../components/ModaLTransfer'
import Axios from 'axios'

export default function Transfers() {
  const navigate = useNavigate()
  const { token } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false);
  const { choosenAccount } = useContext(AccountContext)

  const [transfers, setTransfers] = useState([])
  const [modeType, setModeType] = useState(1)

  const fetchData = async () => {
    try {
      const res = await Axios.get(`${baseUrl}/accounts?_id=${choosenAccount?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.accounts[0].transactions);
      setTransfers(res.data.accounts[0].transactions)
      console.log(transfers);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err)
    }
  }

  useEffect(() => {
    fetchData()
    // console.log(token);
    // console.log(choosenAccount);
  }, [token, choosenAccount])
  return (
    <div>
      <button onClick={() => { navigate('/menu') }}>Back to menu</button>
      <CreateTransfer transfers={transfers} setTransfers={setTransfers} />

      {
        transfers.length != 0 ?
          <>
            {transfers.find((transf) => transf.type == 'expenditure') && transfers.find((transf) => transf.type == 'income') ?
              <>
                <button onClick={() => { setModeType(1) }}>show all</button>
                <button onClick={() => { setModeType(2) }}>show expenditure</button>
                <button onClick={() => { setModeType(3) }}>show income</button>
              </>
              : null}
          </>
          : null}

      {modalOpen && (
        <ModalTransfer
          // NameBring={NameBring}
          // addItemToUser={addItemToUser}
          // index={index}
          // itemName={itemName}
          setOpenModal={setModalOpen}
        />
      )}
      {transfers?.filter(transfer => {
        if (modeType === 1) return true;
        if (modeType === 2) return transfer.type === 'expenditure';
        if (modeType === 3) return transfer.type === 'income';
      }).map((transfer, i) => (
        <div onClick={() => { setModalOpen(true); }}>
          <SingleTransfer key={i} transfer={transfer} />
        </div>
      ))}
    </div>
  );
}
