import React from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import link from '../../image/movie.jpg'

export default function MovieCard({movie, onLikeClick}) {
    const location = useLocation();
    const path = location.pathname;
    const isLiked = true; //временная заглушка

    const movieLikeButtonClassName = (
        `button movie__button movie__like ${isLiked ? 'movie__like_active' : ''}`);

        // function handleLikeClick() {
        //     onLikeClick(movie);
        // }

    return (
        <>
            <div className='movie'>
                <div className='movie__caption'>
                    <h1 className='movie__title'>StarWars</h1>
                    <p className='movie__duraction'>1:30</p>
{path === '/movies' ? 
                    <button className={movieLikeButtonClassName}
                    type='button'
                    aria-label="Иконка-флажок"
                    title="Добавить в избранное"
                    // onClick={handleLikeClick}
                    />
                : 
                <button className="movie__button movie__button_type_delete button"
                type='button'
                aria-label="Иконка удаления карточки с фильмом"
                title="Удалить из списка сохраненных фильмов"
                // onClick={handleLikeClick}
                />}

                </div>
                <img className="movie__image" src={link} alt='#'/>
            </div>
        </>
    )
}