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
        console.log(newData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(logOrSign);
            if (!logOrSign) {
                const response = await Axios.post(urlLogIn, {
                    email: userdata.email,
                    password: userdata.password
                });
                setUser(response.data.user)
                const tokenLocal = response.data.token;
                localStorage.setItem('tokenLocal', tokenLocal);
                console.log("Token saved to local storage:", tokenLocal);
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
                console.log("Token saved to local storage:", tokenLocal);
                navigate('/')
            }
        } catch (error) {
            console.error("Error logging in:", error);
            console.log(error.response.data.index);
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
                console.log(data);
                setUsers(data.users)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])
    return (
        <div className={styles.containerPage}>
            {
                logOrSign ? <>
                    <div className={styles.Container}>
                        <Register emailExist={emailExist} handleSubmit={handleSubmit} handleChange={handleChange}
                             />
                    </div>
                </>
                    : <>
                        <div className={styles.Container}>
                            <LogIn handleSubmit={handleSubmit} handleChange={handleChange}
                                />
                        </div >
                    </>
            }

        </div>
    )
}
