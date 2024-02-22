import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/User.jsx'
import AccountProvider from './context/Account.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <AccountProvider>
            <App />
        </AccountProvider>
    </UserProvider>
)
