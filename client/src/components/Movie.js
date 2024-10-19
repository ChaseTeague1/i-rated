import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Movie({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
    <div className="m-8 cursor-pointer">
      <div className="border w-48 h-72 hover:shadow-md hover:shadow-green-400 rounded-md overflow-hidden">
        <img
          src={movie.poster_image}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-white hover:text-green-400 text-center mt-2">{movie.title}</h1>
    </div>
    </Link>
  );
}

export default Movie;
