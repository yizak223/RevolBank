import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import CreateAccount from '../../components/CreateAccount';
import SingleCard from '../../components/SingleCard';
import Axios from 'axios';
import { UserContext } from '../../context/User';
import { AccountContext } from '../../context/Account';
import BaseUrl from '../../config/BaseUrl';
import CreateCard from '../../components/CreateCard';
import ModalCreditCard from '../../components/ModalCreditCard';
import styles from './creditCrad.module.css';

export default function CreditCard() {
  const modalAcount = useSelector((state) => state.modal.modalAcount);
  const { token } = useContext(UserContext);
  const { choosenAccount, accounts } = useContext(AccountContext);
  const [cards, setCards] = useState([]);
  const [accountState, setAccountState] = useState(choosenAccount);
  const [createCardMode, setCreateCardMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [card, setCard] = useState([]);
  const [creditCard, setCreditCard] = useState({ idAccount: accountState });
  const [scrollIndex, setScrollIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0); 

  const createAccountStyle = false;

  const fetchData = async () => {
    try {
      const idAccount = choosenAccount?._id;
      const res = await Axios.get(`${BaseUrl}/crditCard?idAccount=${idAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedCards = res.data.creditCards.filter(card => card.isActive !== false);
      setCards(updatedCards);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
    }
  };

  const deleteCard = async (id) => {
    try {
      const res = await Axios.patch(`${BaseUrl}/crditCard/${id}`, { isActive: false }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedCards = cards.filter(card => card._id !== id);
      setCards(updatedCards);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchModal = (transfer) => {
    setCard(transfer);
  };

  const handleChange = (e) => {
    setAccountState(e.target.value);
    setCreditCard({ ...creditCard, idAccount: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(`${BaseUrl}/creditCard`, creditCard, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCards([...cards, res.data]);
      setCreateCardMode(!createCardMode);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, choosenAccount]);
  useEffect(() => {
    // Calculate card width based on viewport width
    const updateCardWidth = () => {
        const viewportWidth = window.innerWidth;
        let newCardWidth;
        if (viewportWidth <= 360) {
            newCardWidth = viewportWidth * 0.79;
        } else if (viewportWidth <= 389) {
            newCardWidth = viewportWidth * 0.86;
        } else if (viewportWidth <= 412) {
            newCardWidth = viewportWidth * 0.77;
        } else if (viewportWidth <= 429) {
            newCardWidth = viewportWidth * 0.89;
        } else if (viewportWidth <= 768) {
            newCardWidth = viewportWidth * 0.78;
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
    setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightArrowClick = () => {
    setScrollIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 1));
  };
cards.forEach(element => {
  
});
  return (
    <>
      {modalAcount && <CreateAccount createAccountStyle={createAccountStyle} />}

      <div className={styles.container}>
        <div className={styles.secContainer}>
          <div className={styles.left}>
            {modalOpen && (
              <ModalCreditCard
                card={card}
                setOpenModal={setModalOpen}
              />
            )}
            <div className={styles.cardArrows}>
              <div className={styles.arrowL} onClick={handleLeftArrowClick}>
                <i className="fa-solid fa-chevron-left"></i>
              </div>
              <div className={styles.containerCards} >
                {cards?.map((card, i) => (
                  card.isActive ?
                    <div key={i} className={styles.containerCard} style={{ transform: `translateX(-${scrollIndex * cardWidth}px)`}}>
                      <SingleCard card={card} cards={cards} setCards={setCards} />
                    </div>
                    : null
                ))}
              </div>
              
              <div className={styles.arrowR} onClick={handleRightArrowClick}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>

            <div className={styles.sellingSentence}>
              <h1>Enjoy unmatched rewards and exclusive perks with our premium credit card.</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
