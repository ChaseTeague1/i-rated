import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Movie from './Movie';
import Genres from "./Genres";

function MovieList({ movies, user, handleDelete, handleGenreClick, genres, clearFilter }) {
    const [deleteWindow, setDeleteWindow] = useState(false)
    const history = useHistory()

  const isAdmin = user && user.role === 'admin';

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      handleDelete(id);
    }
  };
  

  return (
    <div className="flex flex-col items-center">
        <Genres clearFilter={clearFilter} handleGenreClick={handleGenreClick} genres={genres}/>
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
                <button className="bg-yellow-500 text-white text-xs px-2 py-1">Edit</button>
                <button onClick={() => confirmDelete(movie.id)} className="bg-red-500 text-white text-xs px-2 py-1">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
