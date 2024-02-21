import React from 'react'
import './Input.css'

export default function Input({inputName, inputType, inputLabel, inputPlaceholder, error, onChange, value}) {
    return (
        <>
        <label className='input__label' htmlFor={inputName}>{inputLabel}
                <input
                    className={`input ${error && "input_type_color"}`}
                    name={inputName} 
                    type={inputType}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    value={value}
                    required
                />
                <span className={`input__error ${error && "input__error_visible"} text`}>{error}</span>
                </label>
        </>
    )
}