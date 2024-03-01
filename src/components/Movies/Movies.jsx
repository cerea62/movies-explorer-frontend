import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import moviesApi from '../../utils/MoviesApi'
import mainApi from '../../utils/MainApi';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import searchFilter from '../../utils/Filter';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки фильмов из базы
  const [error, setError] = useState(''); // ошибка запроса

  //при открытии главной страницы с фильмами загрузили все сохраненки в хранилище key = savedMovies
  useEffect(() => {
    const savedMovies = localStorage.getItem('savedMovies');
    if (!savedMovies) {
      setIsLoading(true);
      mainApi
        .getUserMovies()
        .then((data) => {
          if (data.length > 0) {
            localStorage.setItem('savedMovies', JSON.stringify(data));
          }
          setIsLoading(false);
        })
        .catch(() => {
          // setError(MOVVIES_MESSAGE);
        });
    }
  }, []);

  // фильтр по ключевому слову query
  const filter = (query, shorts) => {
    const savedMovies = JSON.parse(localStorage.getItem('movies'));
    const filtered = searchFilter(savedMovies, query, shorts);
    if (filtered.length === 0) {
      // setError(NOT_FOUND_MESSAGE);
    }
    setMovies(filtered);
    setIsLoading(false);
  };

  // обработчик кнопки Найти фильм
  const handleSearch = (query, shorts) => {
      setIsLoading(true);
      console.log(isLoading);
    // ищем ВСЕ фильмы в localStorage
    // если их нет - загружаем с beatfilm
    const savedMovies = JSON.parse(localStorage.getItem('movies'));
    if (!savedMovies) {
      moviesApi
        .getMovies()
        .then((films) => {
          // сохраняем фильмы
          localStorage.setItem('movies', JSON.stringify(films));
          filter(query, shorts);
        })
        .catch(() => {
          // setError(MOVVIES_MESSAGE);
        });
    } else {
      filter(query, shorts);
    }
  };

  return (
    <>
      <main className='movies'>
        <SearchForm
          handleSearch={handleSearch} />
        {isLoading ?
          <Preloader />
          :
          <MoviesCardList
            movies={movies} />
        }
      </main>
    </>
  )
}