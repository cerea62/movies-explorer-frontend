import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import searchIcon from '../../image/search-icon.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

export default function SearchForm({handleSearch}) {
    const [shorts, setShorts] = useState(false); // состояние чекбокса для выбора короткометражек
//   const [placeholderContent, setPlaceholderContent] = useState('Название'); // текст плейсхолдера после запроса нужно менять
  const [inputValue, setInputValue] = useState('');
  const { pathname } = useLocation();

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  // выбрать короткометражки
  const onChangeFilter = () => {
    setShorts(!shorts);
    handleSearch(inputValue, !shorts);
    if (pathname === '/movies') {
      localStorage.setItem('shorts', !shorts);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
    //   setError(true);
      evt.target.elements['search-query'].focus();
      return;
    }
    if (pathname === '/movies') {
      localStorage.setItem('query', inputValue);
    }
    handleSearch(inputValue, shorts, pathname);
  };
  useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('query');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));
      if (savedInputValue) {
        setInputValue(savedInputValue);
      }
      if (savedShorts) {
        setShorts(savedShorts);
      }
      if (savedInputValue || savedShorts === true) {
        handleSearch(savedInputValue, savedShorts);
      }
    }
  }, [pathname]);

    return (
        <>
            <section className='search'>
                <div className='search-container'>
                    <form className='search__form' onSubmit={handleSubmit}>
                        <img className='search__form-icon' src={searchIcon} alt="Иконка лупа" />
                        <input
                            className='search__field'
                            name="movie"
                            type='text'
                            placeholder='Фильм'
                            value={inputValue}
                            onChange={handleChange}
                            required
                        />
                        <button className='search__submit'></button>
                    </form>
                    <FilterCheckbox
                        onChangeFilter={onChangeFilter}
                        shorts={shorts} />
                </div>
            </section>
        </>
    )
}