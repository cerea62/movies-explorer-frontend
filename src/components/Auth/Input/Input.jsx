import React from 'react'
import './Input.css'


export default function Input({inputName, inputType, inputLabel, inputPlaceholder,
     error, onChange, inputValue, inputState, isValid, minLength, maxLength, errorMesage}) {
    return (

        <>
        <label className='input__label' htmlFor={inputName}>{inputLabel}
                <input
                    className={`input ${{error} && "input_type_color"}`}
                    name={inputName} 
                    type={inputType}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    value={inputValue}
                    disabled={inputState}
                    required
                    minLength={minLength}
                    maxLength={maxLength}
                />
                <span className='input__error'>{error ? errorMesage : ''}</span>
                </label>
        </>
    )
}