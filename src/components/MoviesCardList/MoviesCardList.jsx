
import React from 'react'
import './MoviesCardList.css'
import MovieCard from '../MovieCard/MovieCard'

export const movies = [{
    _id: 'a1',
    title: 'StarWars',
    duration: '1:40',
    link: 'https://www.wallpapers13.com/wp-content/uploads/2016/04/Star-Wars-episode-iv-caracters-Harrison-Ford-Darth-Vader-Carrie-Fisher-Luke-Skywalker-Chewbacca-Wallpaper-HD-2560x1440.jpg'
},


{
    _id: 'a2',
    title: 'StarWars',
    duration: '1:40',
    link: 'https://www.wallpapers13.com/wp-content/uploads/2016/04/Star-Wars-episode-iv-caracters-Harrison-Ford-Darth-Vader-Carrie-Fisher-Luke-Skywalker-Chewbacca-Wallpaper-HD-2560x1440.jpg'

},


{
    _id: 'a3',
    title: 'StarWars',
    duration: '1:40',
    link: 'https://www.wallpapers13.com/wp-content/uploads/2016/04/Star-Wars-episode-iv-caracters-Harrison-Ford-Darth-Vader-Carrie-Fisher-Luke-Skywalker-Chewbacca-Wallpaper-HD-2560x1440.jpg'
},


{
    _id: 'a4',
    title: 'StarWars',
    duration: '1:40',
    link: 'https://www.wallpapers13.com/wp-content/uploads/2016/04/Star-Wars-episode-iv-caracters-Harrison-Ford-Darth-Vader-Carrie-Fisher-Luke-Skywalker-Chewbacca-Wallpaper-HD-2560x1440.jpg'
},
{
    _id: 'a5',
    title: 'StarWars',
    duration: '1:40',
    link: 'https://www.wallpapers13.com/wp-content/uploads/2016/04/Star-Wars-episode-iv-caracters-Harrison-Ford-Darth-Vader-Carrie-Fisher-Luke-Skywalker-Chewbacca-Wallpaper-HD-2560x1440.jpg'
},
{
    _id: 'a6',
    title: 'StarWars',
    duration: '1:40',
    link: 'https://www.wallpapers13.com/wp-content/uploads/2016/04/Star-Wars-episode-iv-caracters-Harrison-Ford-Darth-Vader-Carrie-Fisher-Luke-Skywalker-Chewbacca-Wallpaper-HD-2560x1440.jpg'
},

]

export default function SavedMovies({ onLikeClick }) {
    return (
        <section className='movies'>
            <div className='movies__container'>
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
                <button className='movies__add-items button'>Ещё</button>
            </div>
        </section>
    )
}