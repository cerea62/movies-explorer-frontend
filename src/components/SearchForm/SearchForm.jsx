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
//   const [error, setError] = useState(false); // состояние ошибок инпутов
  const { path } = useLocation();

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  // выбрать короткометражки
  const onChangeFilter = () => {
    setShorts(!shorts);
    handleSearch(inputValue, !shorts);
    if (path === '/movies') {
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
    // setError(false);
    // setPlaceholderContent('Movie');
    if (path === '/movies') {
      localStorage.setItem('query', inputValue);
    }
    handleSearch(inputValue, shorts);
  };

  // при перезагрузке страницы проверим есть ли запрос уже в localStorage
  // если есть - вставим в поиск и выведем
  useEffect(() => {
    if (path === '/movies') {
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
  }, []);

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
                        filterShortMovies={shorts} />
                </div>
            </section>
        </>
    )
}