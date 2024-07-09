import React from 'react'

export default function NextBtn({ next, prev, setNext, setPrev }) {

    const nextBalance = () => {
        setNext(next + 7)
        setPrev(prev + 7)
    }

    return (
        <button onClick={nextBalance}>Next</button>
    )
}
