import React from 'react';
import './SearchForm.css';
import searchIcon from '../../image/search-icon.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
    return (
        <>
            <section className='search'>
                <div className='search-container'>
                <form className='search__form'>
                    <img className='seach__icon' src={searchIcon} alt="Иконка лупа" />
                    <input
                        className='search__field'
                        name="movie"
                        type='text'
                        placeholder='Фильм'
                        required
                    />
                    <button className='search__submit'></button>
                </form>
                <FilterCheckbox />
                </div>
            </section>
        </>
    )
}