import React from 'react'
import { useState, useEffect } from 'react';
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

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusInfo, setStatusInfo] = useState('');
  const [infoTitle, setInfoTitle] = useState('');
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    getAllMovies();
  }, []);

  function handlecloseModal() {
    setOpenModal(false);
  }

  const getAllMovies = () => {
    const movies = JSON.parse(localStorage.getItem("movies") || "[]");
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
    if (movies.length === 0 || savedMovies.length === 0) {
      setIsLoading(true);
      Promise.all([moviesApi.getMovies(), mainApi.getUserMovies()]).then(
        ([movies, savedMovies]) => {
          movies.forEach((movie) => {
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
          localStorage.setItem('movies', JSON.stringify(movies));
          localStorage.setItem("savedMovies", JSON.stringify(movies.filter((movie) => movie.isLiked)));
          setSavedMovies(JSON.parse(
            localStorage.getItem("savedMovies") || "[]"
          ));
          setIsLoading(false);
        }).catch((err) => {
          setStatusInfo(true);
          setOpenModal(false);
          setInfoTitle(MOVVIES_MESSAGE);
        });
    } else {
      setSavedMovies(JSON.parse(
        localStorage.getItem("savedMovies") || "[]"
      ));
    }
  }

  const filter = (query, shorts, path) => {
    setIsLoading(true);
    if (path === '/movies') {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const filtered = searchFilter(movies, query, shorts);
      if (filtered.length === 0) {
        setOpenModal(true);
        setStatusInfo(false);
        setInfoTitle(NOT_FOUND_MESSAGE)
      }
      setMovies(filtered);

    } else {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const filteredSaved = searchFilter(savedMovies, query, shorts);
      if (filteredSaved.length === 0) {
        setOpenModal(true);
        setStatusInfo(false);
        setInfoTitle(NOT_FOUND_MESSAGE)
      }
      setSavedMovies(filteredSaved);
    }
    setIsLoading(false);
  };

  const handleLikeMovie = (movie, path) => {
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

    if (movie.isLiked || path === '/saved-movies') {
      mainApi
        .deleteMovie(movie._id)
        .then(() => {
          changeLocalStorageData(movie, undefined);
        })
        .catch(() => {
          console.log("Error delete liked move", movie);
        });
    } else {
      mainApi
        .saveMovie(prepareMovie)
        .then((movieResp) => {
          changeLocalStorageData(movie, movieResp._id)
        })
        .catch(() => {
          console.log("Error save liked move", movie);
        });
    }
  }

  function changeLocalStorageData(movie, createdId) {

    const filtredMovies = movies.map((filtredMovie) => {
      if (filtredMovie.id === movie.id) {
        filtredMovie.isLiked = !filtredMovie.isLiked;
      }
      return filtredMovie;
    });

    const allMovies = JSON.parse(localStorage.getItem('movies'));
    const localMovies = allMovies.map((localMovie) => {
      if (localMovie.id === movie.id) {
        localMovie.isLiked = !localMovie.isLiked;
        if (createdId) {
          localMovie._id = createdId;
        }
      }
      return localMovie;
    });

    localStorage.setItem(
      "movies",
      JSON.stringify(localMovies)
    );
    localStorage.setItem(
      "savedMovies",
      JSON.stringify(localMovies.filter((movieitem) => movieitem.isLiked))
    );
    setMovies(filtredMovies);
    setSavedMovies(localMovies.filter((movieitem) => movieitem.isLiked));

  }

  // обработчик кнопки Найти фильм
  const handleSearch = (query, shorts, path) => {
    setIsLoading(true);
    filter(query, shorts, path);
    setIsLoading(false);
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
            savedMoviesList={savedMovies}
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