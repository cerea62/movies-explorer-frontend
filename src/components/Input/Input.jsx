import React from 'react'
import './Input.css'

export default function Input({inputName, inputType, inputLabel, email}) {
    return (
        <>
        <label className='input__label' for={inputName}>{inputLabel}</label>
                <input
                    className="input"
                    name={inputName} 
                    type={inputType}
                    // placeholder="Email"
                    //   value={email}
                    //   onChange={handleEmailChange}
                    required
                />
        </>
    )
}