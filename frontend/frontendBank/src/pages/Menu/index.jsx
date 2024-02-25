import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loans from '../Loans'
import Transfers from '../Transfers'
import './Menu.css'

export default function () {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={()=>{navigate('/loans')}}>Loans</button>
            <button onClick={()=>{navigate('/transfers')}}>Transfers</button>
            <button onClick={()=>{alert('building...')}}>Boonds</button>
            {/* <div className='containerTranLoan'>
                <Loans />
                <Transfers/>
            </div> */}
            
        </div>
    )
}
