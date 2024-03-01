import React from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import { moviesApiAddress } from '../../utils/constants';
// import link from '../../image/movie.jpg'

export default function MovieCard({ movie}) {
    const imageUrl = movie.image.url;
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    const movieTrailer = movie.trailerLink;
    const location = useLocation();
    const path = location.pathname;
    const isLiked = false; //временная заглушка

    const movieLikeButtonClassName = (
        `button movie__button movie__like ${isLiked ? 'movie__like_active' : ''}`);

    function handleLikeClick(e) {
        const button = e.target;
        if (button.classList.contains("movie__like_active")) {
            button.classList.remove("movie__like_active");
        } else {
            button.classList.add("movie__like_active");
        }
    }

    return (
        <>
            <div className='movie'>
                <div className='movie__caption'>
                    <div>
                        <h1 className='movie__title'>{movie.nameRU}</h1>
                        <p className='movie__duraction'>{hours}ч. {minutes} мин.</p>
                    </div>
                    {path === '/movies' ?
                        <button className={movieLikeButtonClassName}
                            type='button'
                            aria-label="Иконка-флажок"
                            title="Добавить в избранное"
                            onClick={handleLikeClick}
                        />
                        :
                        <button className="movie__button movie__button_type_delete button"
                            type='button'
                            aria-label="Иконка удаления карточки с фильмом"
                            title="Удалить из списка сохраненных фильмов"
                            onClick={handleLikeClick}
                        />}

                </div>
                <a className='movie__trailer' href={movieTrailer}  target="_blank" rel="noopener noreferrer">
                <img className="movie__image" src={`${moviesApiAddress}${imageUrl}`} alt={movie.nameRu} />
                </a>
            </div>
        </>
    )
}