import React, { useContext, useEffect, useState } from 'react'
import SingleTransfer from '../../components/SingleTransfer'
import CreateTransfer from '../../components/CreateTransfer'
import { useLocation, useNavigate } from 'react-router-dom'
import baseUrl from '../../config/BaseUrl'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import ModalTransfer from '../../components/ModaLTransfer'
import Axios from 'axios'
import styles from './transfers.module.css'

export default function Transfers() {
  const location = useLocation();
  const navigate = useNavigate()
  const { token } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false);
  const [transfer, setTransfer] = useState([])
  const [createTransfer, setCreateTransfer] = useState(false)
  const [firstFour, setFirstFour] = useState(0)
  const [lastFour, setLastFour] = useState(4)
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

  const fetchModal = (transfer) => {
    setTransfer(transfer)
  }

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'all':
        setModeType(1);
        break;
      case 'expenditure':
        setModeType(2);
        break;
      case 'income':
        setModeType(3);
        break;
    }
  }
  useEffect(() => {
    fetchData()
    // console.log(token);
    // console.log(choosenAccount);
  }, [token, choosenAccount])

  return (
    <div className={styles.containerPage}>
      <div className={styles.secContainer}>
        <div className={styles.left}>
          <div className={styles.containerBtns}>
            <button className={styles.backBtn} onClick={() => { navigate('/menu') }}>Back to menu</button>
            <button className={createTransfer ? styles.red : styles.green} onClick={() => { setCreateTransfer(!createTransfer) }}>{!createTransfer ? 'Create Transfer' : 'Cancel'}</button>
            {
              transfers.length != 0 ?
                <>
                  {transfers.find((transf) => transf.type == 'expenditure') && transfers.find((transf) => transf.type == 'income') ?
                    <>
                      <select className={styles.select} name="trasferType" onChange={handleChange}>
                        <option className={styles.option} value="all">show all</option>
                        <option className={styles.option} value="expenditure">show expenditure</option>
                        <option className={styles.option} value="income">show income</option>
                      </select>
                    </>
                    : null}
                </>
                : null
            }
          </div>
          {modalOpen && (
            <ModalTransfer
              transfer={transfer}
              setOpenModal={setModalOpen}
            />
          )}
          {transfers?.filter(transfer => {
            if (modeType === 1) return true;
            if (modeType === 2) return transfer.type === 'expenditure';
            if (modeType === 3) return transfer.type === 'income';
          }).map((transfer, i) => (
            <div key={i} onClick={() => {
              setModalOpen(true);
              fetchModal(transfer)
            }}>
              {
                firstFour <= i && i < lastFour ?
                  <SingleTransfer transfer={transfer} />
                  : null
              }
            </div>
          ))}
          {
            firstFour == 0 ? null
              : <button onClick={() => {
                setFirstFour(firstFour - 4)
                setLastFour(lastFour - 4)
              }}>previous</button>
          }
          {
            lastFour >= transfers.length ?
              null
              : <button onClick={() => {
                setFirstFour(firstFour + 4)
                setLastFour(lastFour + 4)
              }}>next</button>
          }

        </div>
        <div className={styles.right}>

          <div className={styles.container}>
            {createTransfer ?
              <CreateTransfer createTransfer={createTransfer} setCreateTransfer={setCreateTransfer} setTransfers={setTransfers} transfers={transfers} />
              : <img className={styles.logoimg} src="src/images/KB.png" alt="" />

            }</div>
        </div>
      </div>
    </div>
  );
}
