import React, { createContext, useState } from 'react'

export const PathContext = createContext({})

export default function PathProvider({ children }) {
    const [path, setPath] = useState()

    const shared = { path, setPath }
    return (
        <div>
            <PathContext.Provider value={shared}>
                {children}
            </PathContext.Provider>
        </div>
    )
}
