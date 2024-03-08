import React from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import { MOVIES_URL_ADDRESS } from '../../utils/constants';

export default function MovieCard({ movie, handleLikeMovie }) {

    const imageUrl = movie.image.url;
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    const movieTrailer = movie.trailerLink;
    const location = useLocation();
    const path = location.pathname;
    const movieLikeButtonClassName = (
        `button movie__button movie__like ${movie.isLiked ? 'movie__like_active' : ''}`);

    function handleLikeClick(e) {
        const button = e.target;
        if (button.classList.contains("movie__like_active")) {
            button.classList.remove("movie__like_active");
        } else {
            button.classList.add("movie__like_active");
        }

    }
    function likeMovie(e) {

        handleLikeMovie(movie, path);
        handleLikeClick(e);
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
                            onClick={likeMovie}
                        />
                        :
                        <button className="movie__button movie__button_type_delete button"
                            type='button'
                            aria-label="Иконка удаления карточки с фильмом"
                            title="Удалить из списка сохраненных фильмов"
                            onClick={likeMovie}
                        />}

                </div>
                <a className='movie__trailer' href={movieTrailer} target="_blank" rel="noopener noreferrer">
                    <img className="movie__image" src={(`${MOVIES_URL_ADDRESS}${imageUrl}`)}
                        alt={movie.nameRu} />
                </a>
            </div>
        </>
    )
}