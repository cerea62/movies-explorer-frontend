import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import moviesApi from '../../utils/MoviesApi'
import mainApi from '../../utils/MainApi';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import searchFilter from '../../utils/Filter';
import Preloader from '../Preloader/Preloader';
import Modal from '../Modal/Modal';

export default function Movies({ }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки фильмов из базы
  const [error, setError] = useState('');
  const [statusInfo, setStatusInfo] = useState('');
  const [infoTitle, setInfoTitle] = useState(''); // ошибка запроса
  const [openModal, setOpenModal] = useState('');

  function handlecloseModal() {
    setOpenModal(false);
  }
  const getSavedMovies = () => {
    const savedMoviesCache = localStorage.getItem('savedMovies');
    if (!savedMoviesCache) {
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
          // setStatusInfo(true);
          // setOpenModal(true);
          // setInfoTitle("Что-то пошло не так! Попробуйте еще раз.")
        });
    }
  }

  //при открытии главной страницы с фильмами загрузили все сохраненки в хранилище key = savedMovies
  useEffect(() => {
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    getSavedMovies();
  }, []);

  // фильтр по ключевому слову query
  const filter = (query, shorts) => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    const filtered = searchFilter(movies, query, shorts);
    if (filtered.length === 0) {
      setOpenModal(true);
      setStatusInfo(false);
      setInfoTitle('Ничего не найдено!')
      // setError(NOT_FOUND_MESSAGE);
    }

    // Проставляем признак isLiked для уже отфильтованных данныъ
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    filtered.forEach((movie) => {
      if (savedMovies) {
        const isSelected = savedMovies.filter((item) =>
          item.movieId === movie.id);
        movie.isLiked = isSelected.length > 0;
        if (isSelected.length > 0) {
          movie._id = isSelected[0]._id;
        }
      } else {
        movie.isLiked = false;
      }
    });

    setMovies(filtered);
    setIsLoading(false);
  };

  const handleLikeMovie = (movie) => {
    const prepareMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration.toString(),
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    if (movie.isLiked) {
      mainApi
        .deleteMovie(movie._id)
        .then(() => { })
        .catch(() => {
          console.log("Error delete liked move", movie);
        });
    } else {
      mainApi
        .saveMovie(prepareMovie)
        .then((movieResp) => { })
        .catch(() => {
          console.log("Error save liked move", movie);
        });
    }
  }


  // обработчик кнопки Найти фильм
  const handleSearch = (query, shorts) => {
    setIsLoading(true);
    console.log(isLoading);
    // ищем ВСЕ фильмы в localStorage
    // если их нет - загружаем с beatfilm
    const movesCache = JSON.parse(localStorage.getItem('movies'));
    if (!movesCache) {
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
            movies={movies}
            handleLikeMovie={handleLikeMovie} />
        }
        <Modal
          isOpen={openModal}
          onClose={handlecloseModal}
          statusInfo={statusInfo}
          title={infoTitle}
        />
      </main>
    </>
  )
}