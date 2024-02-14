import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
    return (
        <>
            <div className='checkbox'>
                <label className="checkbox__label">
                    <input className='checkbox__input' type="checkbox" />
                    <span className="checkbox__slider"></span>
                </label>
                <p className='checkbox__caption'>Короткометражки</p>
            </div>
        </>
    )
}
