import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/User.jsx'
import AccountProvider from './context/Account.jsx'
import PathProvider from './context/Path.jsx'
import RegisterProvider from './context/RegisterMode.jsx'
import { Provider } from 'react-redux';
import store from '../src/redux/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <UserProvider>
            <AccountProvider>
                <RegisterProvider>
                    <PathProvider>
                        <App />
                    </PathProvider>
                </RegisterProvider>
            </AccountProvider>
        </UserProvider>
    </Provider>
)
