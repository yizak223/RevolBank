import React, { useContext, useState } from 'react'
import CreateCard from '../CreateCard';
import { AccountContext } from '../../context/Account';
import { UserContext } from '../../context/User';
import baseUrl from '../../config/BaseUrl';
import axios from 'axios';

export default function ModalAlert({ setOpenModal, openModal, setCards, setShowCard, cards ,showCard}) {
    const { token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)
    const [accountState, setAccountState] = useState(choosenAccount)
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
            setOpenModal(!openModal)
            if(showCard == -1){
                setShowCard(0)
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="body">
                    <CreateCard submitHandler={submitHandler} handleChange={handleChange} setOpenModal={setOpenModal} />
                </div>
            </div>
        </div>
    )
}
