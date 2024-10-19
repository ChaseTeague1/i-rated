import React from "react";

function Genres({ handleGenreClick, genres, clearFilter }) {
    return (
        <div className="flex justify-center gap-24 m-4">
            <button 
                className="text-white hover:text-green-300 cursor-pointer" 
                onClick={clearFilter}
            >
                All Movies
            </button>
            {
                genres.map(genre => (
                    <ul key={genre.id}>
                        <li 
                            className="text-white hover:text-green-300 cursor-pointer"
                            onClick={() => handleGenreClick(genre.id)}
                        >
                            {genre.name}
                        </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default Genres;