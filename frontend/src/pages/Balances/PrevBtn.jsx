import React from 'react'

export default function PrevBtn({ next, prev, setNext, setPrev }) {

    const prevBalance = () => {
        setNext(next - 7)
        setPrev(prev - 7)
    }

    return (
        <button onClick={prevBalance}>Prev</button>
    )
}
