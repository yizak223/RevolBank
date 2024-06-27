import React, { useContext, useEffect, useState } from 'react'
import styles2 from './landingPage.module.css'
import { Link } from 'react-router-dom'
import mobileImg from '../../images/mobileImage.png'
import desktopImg from '../../images/Blue Modern Debit Card Promotion Facebook Ad (1).png'
import baseUrl from '../../config/BaseUrl';
import Axios from 'axios';
import { UserContext } from '../../context/User';

export default function About() {
  const [loading, setloading] = useState(true)
  const { setUser } = useContext(UserContext)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const logDemoUser = async () => {
    setloading(false)
    const urlLogIn = `${baseUrl}/users/login`
    try {
      const response = await Axios.post(urlLogIn, {
        email: 'User@gmail.com',
        password: '123123'
      });
      setUser(response.data.user)
      const tokenLocal = response.data.token;
      localStorage.setItem('tokenLocal', tokenLocal);
      console.log("Token saved to local storage:", tokenLocal);
      navigate('/')
    } catch (error) {
      console.error("Error logging in:", error);
    }

  }

  const mobileImage = <img className={styles2.img} src={mobileImg} alt="Mobile Image" />;
  const desktopImage = <img className={styles2.img} src={desktopImg} alt="Desktop Image" />;

  return (
    <>
      {
        loading ?
          <div className={styles2.page}>
            <h1 className={styles2.h1}>No more banking headaches</h1>
            <p className={styles2.paragraph}>Revolutionize your banking experience with Revol Bank
              Say goodbye to headaches and hello to seamless financial solutions.
            </p>
            <div className={styles2.btnContainer}>
              <Link className={styles2.a} to="/authntication">
                <div className={styles2.navlink}>
                  <li>Get started</li>
                </div>
              </Link>
              <p onClick={logDemoUser}>
                <div className={styles2.navlink}>
                  <li>Use Demo User</li>
                </div>
              </p>
            </div>

            {screenWidth < 768 ? mobileImage : desktopImage}
          </div>
          : <>
          <h3 className='h3Loader'>Loading...</h3>
            <div className="loader"></div>
          </>
      }
    </>

  )
}
