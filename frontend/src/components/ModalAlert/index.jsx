import React, { useContext, useState } from 'react'
import CreateCard from '../CreateCard';
import { AccountContext } from '../../context/Account';
import { UserContext } from '../../context/User';
import baseUrl from '../../config/BaseUrl';
import axios from 'axios';
import styles from './createCardModel.css';

export default function ModalAlert({ setOpenModal, openModal }) {
    const { token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)
    const [cards, setCards] = useState([])
    const [accountState, setAccountState] = useState(choosenAccount)
    const [createCardMode, setCreateCardMode] = useState(false)
    // const [modalOpen, setModalOpen] = useState(false);
    const [card, setcard] = useState([])
    const [creditCard, setCreditCard] = useState({
        idAccount: accountState
    })

    const handleChange = (e) => {
        setAccountState(e.target.value);
        setCreditCard({ ...creditCard, idAccount: e.target.value })
        console.log(creditCard);
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(creditCard);
        try {
            const res = await axios.post(`${baseUrl}/crditCard`, creditCard, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCards([...cards, res.data])
            setCreateCardMode(!createCardMode)
            console.log(res.data);
            setOpenModal(!openModal)
        } catch (error) {
            console.error('Error creating account:', error);
        }
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className={styles.buttonX} onClick={() => { setOpenModal(false) }} >X </button>
                </div>
                <div className="title">
                    {/* <h1>You are not allowed to change it now</h1> */}
                </div>
                <div className="body">
                    <CreateCard submitHandler={submitHandler} handleChange={handleChange} />
                </div>
                <div className="footer">
                    <button onClick={() => { setOpenModal(false) }} id="cancelBtn"> cancel </button>
                    {/* <button >Sent me cvv</button> */}
                </div>
            </div>
        </div>
    )
}
