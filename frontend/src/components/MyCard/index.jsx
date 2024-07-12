import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import { UserContext } from '../../context/User'
import { AccountContext } from '../../context/Account'
import BaseUrl from '../../config/BaseUrl'
import styles from './MyCard.module.css'
import SingleCard from '../SingleCard'
import { FaLock, FaPlus, FaTrash } from 'react-icons/fa6'
import accountNumberConvert from '../../utils/accountNumberConvert'

export default function MyCard({ setOpenModal, setCards, setShowCard, showCard, cards }) {
    const { token, user } = useContext(UserContext)
    const { accounts, choosenAccount } = useContext(AccountContext)
    const [scrollIndex, setScrollIndex] = useState(0); // New state for scroll position
    const [cardWidth, setCardWidth] = useState(0); // New state for card width

    const fetchData = async () => {
        try {
            const idAccount = choosenAccount?._id
            const res = await Axios.get(`${BaseUrl}/crditCard?idAccount=${idAccount}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const updatedCards = res.data.creditCards.filter(card => card.isActive !== false);
            setCards(updatedCards);
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
        }
    }

    const deleteCard = async (id) => {
        try {
            await Axios.patch(`${BaseUrl}/crditCard/${id}`, { isActive: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedCards = cards.filter(card => card._id != id);
            setCards(updatedCards);
            setShowCard(showCard - 1)
            if (cards.length) {
                setShowCard(0)
                setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
        } catch (err) {
            console.log(err);
        }
    }
    const nextCard = () => {
        if (showCard < cards.length - 1) {
            setShowCard(showCard + 1)
        }
    }
    const prevCard = () => {
        if (showCard > 0) {
            setShowCard(showCard - 1)
        }
    }
    useEffect(() => {
        fetchData()
    }, [token, choosenAccount, showCard])

    useEffect(() => {
        // Calculate card width based on viewport width
        const updateCardWidth = () => {
            const viewportWidth = window.innerWidth;
            let newCardWidth;
            if (viewportWidth <= 360) {
                newCardWidth = viewportWidth * 0.88;
            } else if (viewportWidth <= 389) {
                newCardWidth = viewportWidth * 0.86;
            } else if (viewportWidth <= 412) {
                newCardWidth = viewportWidth * 0.86;
            } else if (viewportWidth <= 429) {
                newCardWidth = viewportWidth * 0.89;
            } else if (viewportWidth <= 768) {
                newCardWidth = viewportWidth * 0.9;
            } else if (viewportWidth <= 1024) {
                newCardWidth = viewportWidth * 0.35; // 45% of viewport width for tablet
            } else if (viewportWidth <= 1700) {
                newCardWidth = viewportWidth * 0.29; // 26% of viewport width for desktop
            } else {
                newCardWidth = viewportWidth * 0.285; // 20% of viewport width for large screens
            }

            setCardWidth(newCardWidth);
        };

        updateCardWidth();
        window.addEventListener('resize', updateCardWidth);

        return () => window.removeEventListener('resize', updateCardWidth);
    }, []);

    const handleLeftArrowClick = () => {
        prevCard()
        setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleRightArrowClick = () => {
        nextCard()
        setScrollIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 1));
    };

    return (
        <>
            <div className={styles.lftCrdtCrd}>

                {
                    cards.length > 1 ?
                        <h3 className={styles.titleCard}>My Card
                            <div className={styles.arrows}>
                                <i onClick={handleLeftArrowClick} className="fa-solid fa-chevron-left"></i>
                                <i onClick={handleRightArrowClick} className="fa-solid fa-chevron-right"></i>
                            </div>
                        </h3>
                        :
                        <h3 className={styles.titleCard2}>My Card </h3>
                }
                {
                    showCard === -1 || cards.length === 0 ?
                        <div>
                            <div className={styles.container}>
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
                                    ORDER YOUR CARD
                                </div>
                                <div className={styles.date}>
                                    <p>MM/YY</p>
                                </div>
                                <div>
                                    {
                                        accounts.length != 0 ?
                                            <>
                                                <p>{choosenAccount?.fullName}</p>
                                                <p>{accountNumberConvert(choosenAccount?.numberAccount)}</p>
                                            </>
                                            : <>
                                                <p>{user.fullName}</p>
                                                <p>YOUR ACCOUNT ID</p>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.containerAllCards}>
                            {
                                cards.map((card, i) => (
                                    <div className={styles.containerCard} key={card._id} style={{ transform: `translateX(-${scrollIndex * cardWidth}px)` }}>
                                        <SingleCard card={card} />
                                    </div>
                                ))
                            }
                        </div>

                }
            </div>
            <div className={styles.rightCard}>
                <div onClick={() => { setOpenModal(true) }} className={styles.addCard}><FaPlus className={styles.i} />
                    Add card</div>
                <div onClick={() => {
                    cards ?
                        alert(`${cards[showCard]?.cvv}`)
                        : alert('nothing')
                }} className={styles.transferLoan}><FaLock />CVV</div>
                <div onClick={() => { deleteCard(cards[showCard]._id) }} className={styles.transferLoan}> <FaTrash />DELETE</div>
            </div>
        </>
    )
}
