import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext({})
import Axios from 'axios'
import BaseUrl from '../config/BaseUrl'

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const urlVrify = `${BaseUrl}/users/verify`
    const logUser = async () => {
        try {
            const res = await Axios.post(urlVrify, {
                token: token
            })
            setUser(res.data.user)
            setIsLoggedIn(true)
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    const logOut = async () => {
        localStorage.removeItem('tokenLocal');
        setUser(null);
        setIsLoggedIn(false);
        location.reload();
    }
    // console.log(user);

    useEffect(() => {
        try {
            const tokenLocal = localStorage.getItem('tokenLocal')
            if (tokenLocal) {
                setToken(tokenLocal)
                // console.log(token);
                logUser()
            }
            // console.log(user);
        } catch (error) {
            console.log('no user log in', error);
        }
    }, [token])
    const shared = { setToken, token, user, setUser, logUser ,logOut }
    return (
        <UserContext.Provider value={shared}>
            {children}
        </UserContext.Provider>
    )
}
