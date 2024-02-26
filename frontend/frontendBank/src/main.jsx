import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/User.jsx'
import AccountProvider from './context/Account.jsx'
import PathProvider from './context/Path.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <AccountProvider>
            <PathProvider>
                <App />
            </PathProvider>
        </AccountProvider>
    </UserProvider>
)
