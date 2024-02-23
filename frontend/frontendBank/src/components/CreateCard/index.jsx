import React from 'react'

export default function CreateCard({
    accounts,
    submitHandler,
    handleChange
}) {
  return (
    <div>
          <form onSubmit={submitHandler}>
                  <select onChange={handleChange} name="idAccount" >
                    <option value="" disabled selected>Select account</option>
                    {accounts?.map((account, i) => {
                      return (
                        <option key={i} value={account._id}>{account.fullName}</option>
                      )
                    })}
                  </select>
                  {/* <input onChange={handleChange} type="number" name='idAccount' /> */}
                  <input value={4000} type="number" name='limit' />
                  <button>invite card</button>
                </form>
    </div>
  )
}
