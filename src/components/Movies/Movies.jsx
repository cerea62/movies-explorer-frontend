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
import { NOT_FOUND_MESSAGE } from '../../utils/constants';
import { MOVVIES_MESSAGE } from '../../utils/constants';

export default function Movies({ }) {
  const [movies, setMovies] = useState([]);
  const [savedMoviesList, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки фильмов из базы
  const [statusInfo, setStatusInfo] = useState('');
  const [infoTitle, setInfoTitle] = useState(''); // ошибка запроса
  const [openModal, setOpenModal] = useState('');

  function handlecloseModal() {
    setOpenModal(false);
  }

  const getSavedMovies = () => {
    const savedMoviesCache = localStorage.getItem('savedMovies');
    if (!savedMoviesCache) {
      // setIsLoading(true);
      mainApi
        .getUserMovies()
        .then((movies) => {
          if (movies.length > 0) {
            localStorage.setItem('savedMovies', JSON.stringify(movies));
          }
          // setIsLoading(false);
          console.log(movies);
          setSavedMovies(movies);
        })
        .catch(() => {
          setStatusInfo(true);
          setOpenModal(false);
          setInfoTitle(MOVVIES_MESSAGE);
        });
    } else {
      setSavedMovies(savedMoviesCache);
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
      setInfoTitle(NOT_FOUND_MESSAGE)
    }

    // Проставляем признак isLiked для уже отфильтованных данныx
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

    if (movie.isLiked || !(movie._id === undefined)) {
      mainApi
        .deleteMovie(movie._id)
        .then(() => {
          localStorage.removeItem('savedMovies');
          getSavedMovies();
        })
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
    localStorage.removeItem('savedMovies');
    getSavedMovies();
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
          setStatusInfo(true);
          setOpenModal(false);
          setInfoTitle(MOVVIES_MESSAGE);
        });
    } else {
      filter(query, shorts);
    }


  };

  console.log("savedMoviesList ", savedMoviesList);
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
            savedMoviesList={savedMoviesList}
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