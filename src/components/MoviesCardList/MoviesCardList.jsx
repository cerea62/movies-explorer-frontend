
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCardList.css'
import MovieCard from '../MovieCard/MovieCard'

export default function MoviesCardList({ handleLikeMovie, movies, savedMoviesList }) {

    const {pathname} = useLocation();
    const [countMovies, setCountMovies] = useState(0);
    function shownCount() {
        const display = window.innerWidth
        if (display > 1180) {
            setCountMovies(12) // 12 карточек на разрешении 1280px
        } else if (display > 767) {
            setCountMovies(8) // 8 карточек на разрешении 768px
        } else {
            setCountMovies(5) // 5 карточек на разрешении от 320px до 480px
        }
    }

    useEffect(() => {
        shownCount()
    }, [])

    const resizeAction = () => {
        setTimeout(() => {
            shownCount();
          }, 500);
    }

    useEffect(() => {
        shownCount();
        window.addEventListener('resize', resizeAction)
    return () => {
        document.removeEventListener("resize", resizeAction);
      };  
}, []);

    function showMore() {
        const display = window.innerWidth
        if (display > 1180) {
            setCountMovies(countMovies + 3)
        } else if (display > 767) {
            setCountMovies(countMovies + 2)
        } else {
            setCountMovies(countMovies + 2)
        }
    }

    return (
        <>
            <section className='movies-container' >
                {pathname === '/saved-movies' ? (
                    <ul className="movies-container__items">
                        {savedMoviesList.map(movie => (
                            <li key={movie.id} className="movie">
                                <MovieCard
                                    movie={movie}
                                    handleLikeMovie={handleLikeMovie}
                                />
                            </li>
                        ), 12)}
                    </ul>
                )
                    : (
                        <div>
                            <ul className="movies-container__items">
                                {movies.slice(0, countMovies).map(movie => (

                                    <li key={movie.id} className="movie">
                                        <MovieCard
                                            movie={movie}
                                            handleLikeMovie={handleLikeMovie}
                                        />
                                    </li>
                                ))}
                            </ul>
                            {movies.length > countMovies ?
                                (<button className='movies-container__add-items button' onClick={showMore}>Ещё</button>)
                                : ('')
                            }
                        </div>

                    )}

            </section>
        </>
    )
}