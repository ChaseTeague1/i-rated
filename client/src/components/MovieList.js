import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Movie from './Movie';
import Genres from "./Genres";
import EditMovieModal from "./EditMovieModal";

function MovieList({ movies, user, handleDelete, handleGenreClick, genres, clearFilter, setMovies}) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const history = useHistory();

    const isAdmin = user && user.role === 'admin';

    const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            handleDelete(id);
        }
    };

    const handleUpdateMovie = (updatedMovie) => {
        const updatedMovies = movies.map(movie => 
            movie.id === updatedMovie.id ? updatedMovie : movie
        );
        setMovies(updatedMovies);
    };

    const openEditModal = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="flex flex-col items-center">
            <Genres clearFilter={clearFilter} handleGenreClick={handleGenreClick} genres={genres} />
            {isAdmin && (
                <div className="mb-4">
                    <button onClick={() => history.push('/newmovie')} className="bg-blue-500 text-white px-4 py-2">Add Movie</button>
                </div>
            )}
            <div className="flex justify-center flex-wrap">
                {movies.map(movie => (
                    <div key={movie.id} className="relative m-4 w-60">
                        <Movie movie={movie} />
                        {isAdmin && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                <button 
                                    onClick={() => openEditModal(movie)} 
                                    className="bg-yellow-500 text-white text-xs px-2 py-1"
                                >
                                    Edit
                                </button>
                                <button onClick={() => confirmDelete(movie.id)} className="bg-red-500 text-white text-xs px-2 py-1">Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedMovie && (
                <EditMovieModal 
                    movie={selectedMovie} 
                    closeModal={closeModal} 
                    onUpdate={handleUpdateMovie}
                />
            )}
        </div>
    );
}

export default MovieList;
