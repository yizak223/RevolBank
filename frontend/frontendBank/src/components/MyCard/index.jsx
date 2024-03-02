import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import BaseUrl from '../../config/BaseUrl'
import styles from './MyCard.module.css'
import SingleCard from '../SingleCard'

export default function MyCard() {
    const { user, token } = useContext(UserContext)
    const { choosenAccount } = useContext(AccountContext)
    const [cards, setCards] = useState([])

    const fetchData = async () => {
        try {
            const idAccount = choosenAccount?._id
            console.log(choosenAccount);
            console.log(idAccount);
            const res = await Axios.get(`${BaseUrl}/crditCard?idAccount=${idAccount}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(res.data);
            const updatedCards = res.data.creditCards.filter(card => card.isActive !== false);
            setCards(updatedCards);
            console.log(updatedCards);
            console.log(cards);
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
        }
    }
    const deleteCard = async (id) => {
        try {
            const res = await Axios.patch(`${BaseUrl}/crditCard/${id}`, { isActive: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedCards = cards.filter(card => card._id != id);
            setCards(updatedCards);
            console.log(cards);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData()
    }, [token, choosenAccount])

    return (
        <>
            <div className={styles.lftCrdtCrd}>

                {
                    cards.length > 1 ?
                        <h3 className={styles.titleCard}>My Card
                            <div className={styles.arrows}>
                                <i className="fa-solid fa-chevron-left"></i>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </h3>
                        : 
                        <h3 className={styles.titleCard2}>My Card </h3>
                }
                {
                    cards.map(card => {
                        return (
                            <SingleCard
                                key={card._id}
                                card={card}
                                deleteCard={deleteCard}
                            />
                        )
                    })
                }
                {/* <div className={styles.container}>
                    <div className={styles.titles}>
                        <div >
                            <p>RB</p>
                        </div>
                        <div>
                            <p>VISA</p>
                        </div>
                    </div>
                    <div className={styles.empty}>
                        EMPTY
                    </div>
                    <div className={styles.numCard}>
                        4444-4444-4444-4444
                    </div>
                    <div className={styles.date}>
                        <p>02/27</p>
                    </div>
                    <div>
                        <p>Yitzhak Alaluf</p>
                        <p>322294190</p> </div>
                </div> */}
            </div>
            <div className={styles.rightCard}>
                <div className={styles.addCard}><i className={styles.i} class="fa-solid fa-plus"></i>Add card</div>
                <div className={styles.transferLoan}><i className="fa-solid fa-magnifying-glass"></i>Trandfers</div>
                <div className={styles.transferLoan}><i className="fa-solid fa-money-bill"></i>Loans</div>
            </div>
        </>
    )
}
