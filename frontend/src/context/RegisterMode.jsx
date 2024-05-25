import React, { createContext, useState } from 'react'

export const RegisterContext = createContext({})

export default function RegisterProvider({ children }) {
    const [logOrSign, setlogOrSign] = useState(true)

    const shared = { logOrSign, setlogOrSign }
    return (
        <div>
            <RegisterContext.Provider value={shared}>
                {children}
            </RegisterContext.Provider>
        </div>
    )
}
