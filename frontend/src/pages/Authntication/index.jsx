import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import LogIn from '../../components/LogIn'
import Register from '../../components/Register'
import { UserContext } from '../../context/User'
import { useNavigate } from 'react-router-dom'
import BaseUrl from '../../config/BaseUrl'
import styles from '../../components//CreateAccount/createAccount.module.css'
import { RegisterContext } from '../../context/RegisterMode'


export default function Authntication() {
    const { setToken, setUser } = useContext(UserContext)
    const { logOrSign, setlogOrSign } = useContext(RegisterContext)
    const [users, setUsers] = useState([])
    const [emailExist, setEmailExist] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setloading] = useState(true)
    const [userdata, setUserData] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const urlLogIn = `${BaseUrl}/users/login`
    const urlRegister = `${BaseUrl}/users/register`

    const handleChange = (e) => {
        const newData = { ...userdata }
        newData[e.target.name] = e.target.value
        setUserData(newData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setloading(false)
            if (!logOrSign) {
                const response = await Axios.post(urlLogIn, {
                    email: userdata.email,
                    password: userdata.password
                });
                setUser(response.data.user)
                const tokenLocal = response.data.token;
                localStorage.setItem('tokenLocal', tokenLocal);
                navigate('/')
            }
            else {
                const response = await Axios.post(urlRegister, {
                    fullName: userdata.fullName,
                    email: userdata.email,
                    password: userdata.password
                });
                setUser(response.data.user)
                const tokenLocal = response.data.token;
                localStorage.setItem('tokenLocal', tokenLocal);
                navigate('/')
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setloading(true)
            if (error.response.status === 401) {
                setError(true)
            }
            if (error.response.data.index >= 0) {
                setEmailExist(true)
            }
        }
    }

    useEffect(() => {
        const tokenLocal = localStorage.getItem('tokenLocal')
        if (tokenLocal) {
            setToken(tokenLocal)
            setlogOrSign(true)
        }
        const urlUsers = `${BaseUrl}/users`
        fetch(urlUsers)
            .then(response => response.json())
            .then(data => {
                setUsers(data.users)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])

    return (
        <div className={styles.containerPage}>
            {
                logOrSign ?
                    <>{
                        loading ?
                            <div className={styles.ContainerRegister}>
                                <Register emailExist={emailExist} handleSubmit={handleSubmit} handleChange={handleChange}
                                />
                            </div>
                            :
                            <>
                                <div className={styles.loading}>
                                    <h3 className='h3Loader'>Loading...</h3>
                                    <div className="loader"></div>
                                </div>
                            </>
                    }
                    </>
                    :
                    <>
                        {
                            loading ?
                                <div className={styles.Container3}>
                                    <LogIn 
                                    handleSubmit={handleSubmit} 
                                    handleChange={handleChange}
                                    error={error}
                                    />
                                </div >
                                :
                                <>
                                    <div className={styles.loading}>
                                        <h3 className='h3Loader'>Loading...</h3>
                                        <div className="loader"></div>
                                    </div>
                                </>
                        }
                    </>
            }

        </div>
    )
}
