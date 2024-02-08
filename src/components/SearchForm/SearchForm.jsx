import React from 'react';
import './SearchForm.css';
import searchIcon from '../../image/search-icon.jpg';


export default function SearchForm() {
    return (
        <>
            <div className='search-container'>
                <form className='search__form'>
                    <img className='seach__icon' src={searchIcon} alt="Иконка лупа" />
                    <input
                        className='search__field'
                        name="movie"
                        type='text'
                        placeholder='Фильм'
                    />
                    <button className='search__submit'></button>
                </form>
            </div>
        </>
    )
}