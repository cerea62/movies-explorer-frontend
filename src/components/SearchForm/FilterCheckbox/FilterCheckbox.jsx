import React from 'react';
import './FilterCheckbox.css';
import { filterCheckboxPT } from '../../../utils/propsTypes';

export default function FilterCheckbox({onChangeFilter, shorts}) {
    return (
        <>
            <div className='checkbox'>
                <label className="checkbox__label">
                    <input className='checkbox__input' 
                    type="checkbox"
                    onChange={onChangeFilter}
                    checked={shorts} />
                    <span className="checkbox__slider"></span>
                </label>
                <p className='checkbox__caption'>Короткометражки</p>
            </div>
        </>
    )
}
FilterCheckbox.propTypes = filterCheckboxPT;
