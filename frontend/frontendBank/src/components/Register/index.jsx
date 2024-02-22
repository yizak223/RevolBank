import React from 'react'

export default function Register({ handleSubmit, handleChange, emailExist }) {
    return (
        <div>
            <h1 className="titleSignUp">Sign Up</h1>
            <form onSubmit={handleSubmit} className="AuthDiv">
                <input onChange={handleChange} className="signUpInput" name='fullName' type="name" placeholder="private name" required/>
                {emailExist ? 
                <>
                <p>this email already in use</p>
                </>
                : null}
                <input onChange={handleChange} className="signUpInput" name='email' type="email" placeholder="email@email.com" required/>
                <input onChange={handleChange} className="signUpInput" name='password' type="password" placeholder="*****" required/>
                <button className='btnSubmit'>Submit</button>
            </form>
        </div>
    )
}
