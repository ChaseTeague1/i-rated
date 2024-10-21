import React from "react";
import Movie from "./Movie";

function Home({movies}) {

  const first5Movies = movies.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center m-4 min-h-screen">
      <p className="text-black dark:text-white text-center max-w-3xl">
        <strong>Welcome to I-RATED, your ultimate destination for discovering, rating, and reviewing movies!</strong> 
        Whether you're a film enthusiast looking to share your thoughts or someone searching for the next must-watch movie, 
        I-RATED brings together a community of movie lovers from around the globe. 
        Dive into our extensive library of films, read insightful reviews from fellow viewers, and contribute your own ratings to help others decide what's worth watching. 
        At I-RATED, every opinion matters, and together, we create a trusted space where movies are rated by real fans, for real fans.
      </p>
      <h1 className="mt-10 dark:text-white"><strong>View some of our movies!</strong></h1>
      <div className="flex">
      {
        first5Movies.map(movie => (
          <div key={movie.id}>
            <Movie movie={movie}/>
          </div>
        ))
      }
      </div>
      <p className="m-4 dark:text-white">Enjoy our website and even stay awhile to write your own review! Make an account and start letting others know what movies are worth watching!</p>
    </div>
  );
}

export default Home;