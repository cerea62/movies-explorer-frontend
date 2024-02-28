
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCardList.css'
import MovieCard from '../MovieCard/MovieCard'
import { movies } from '../../utils/constants'



export default function MoviesCardList({ onLikeClick }) {
    const { path } = useLocation();
    const [countMovies, setCountMovies] = useState(0);

    function shownCount() {
        const display = window.innerWidth
        if (display > 1180) {//(display > 1180)
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

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener("resize", shownCount)
        }, 500)
    })

    // Увеличивает количество отображаемых карточек при нажатии на кнопку "Ещё"
    function showMore() {
        const display = window.innerWidth
        if (display > 1180) {//(display > 1180)
            setCountMovies(countMovies + 3)
        } else if (display > 767) {
            setCountMovies(countMovies + 2)
        } else {
            setCountMovies(countMovies + 2)
        }
    }

    return (
        <>
            <section className='movies__container'>
                {path === '/saved-movies' ? (
                        <ul className="movies__items">
                            {movies.map(movie => (
                                <li key={movie._id} className="movie">
                                    <MovieCard
                                        movies={movie}
                                        title={movie.title}
                                        link={movie.link}
                                        duration={movie.duration}
                                        onLikeClick={onLikeClick}
                                    />
                                </li>
                            ))}
                        </ul>
                )
                    : (
                        <div>
                            <ul className="movies__items">
                                {movies.slice(0, countMovies).map(movie => (
                                    <li key={movie._id} className="movie">
                                        <MovieCard
                                            movies={movie}
                                            title={movie.title}
                                            link={movie.link}
                                            duration={movie.duration}
                                            onLikeClick={onLikeClick}
                                        />
                                    </li>
                                ))}
                            </ul>
                            {movies.length > countMovies ?
                                (<button className='movies__add-items button' onClick={showMore}>Ещё</button>)
                                : ('')
                            }
                        </div>

                    )}

            </section>
        </>
    )
}