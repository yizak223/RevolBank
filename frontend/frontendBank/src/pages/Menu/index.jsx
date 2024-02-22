import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function () {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={()=>{navigate('/Loans')}}>Loans</button>
            <button onClick={()=>{navigate('/Transfers')}}>Transfers</button>
            
        </div>
    )
}
