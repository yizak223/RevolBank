import React, { useContext, useEffect, useState } from 'react'
import styles2 from './landingPage.module.css'
import { Link } from 'react-router-dom'
import { RegisterContext } from '../../context/RegisterMode';
import mobileImg from '../../images/mobileImage.png'
import desktopImg from '../../images/Blue Modern Debit Card Promotion Facebook Ad (1).png'

export default function About() {

  const { setlogOrSign } = useContext(RegisterContext)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleGetStrted = () => {
    setlogOrSign(true)
    setPath('/authntication')
  }

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const mobileImage = <img className={styles2.img} src={mobileImg} alt="Mobile Image" />;
  const desktopImage = <img className={styles2.img} src={desktopImg} alt="Desktop Image" />;

  return (
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
        <p>
          <div className={styles2.navlink}>
            <li>Use Demo User</li>
          </div>
        </p>
      </div>

      {screenWidth < 768 ? mobileImage : desktopImage}
    </div>
  )
}
