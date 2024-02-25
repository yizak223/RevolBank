import React from 'react'

export default function ModalAlert({setOpenModal}) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => { setOpenModal(false); }} >X </button>
                </div>
                <div className="title">
                    <h1>You are not allowed to change it now</h1>
                </div>
                <div className="body">
                    <p></p>
                </div>
            </div>
        </div>
    )
}
