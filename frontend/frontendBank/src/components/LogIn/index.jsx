import React from 'react'

export default function LogIn({handleSubmit,handleChange}) {
    return (
        <div>
            <h1 className="titleSignUp">Log In</h1>
            <form onSubmit={handleSubmit} className="AuthDiv">
                <input onChange={handleChange} className='logInInput' name='email' type="email" placeholder="email@email.com" required/>
                <input onChange={handleChange} className='logInInput' name='password' type="password" placeholder="*****" required/>
                <button className='btnSubmit'>Submit</button>
            </form></div>
    )
}
