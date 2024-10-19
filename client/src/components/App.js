import React, { useEffect, useState } from "react";
import ReactRouterDom, { Switch, Route } from "react-router-dom";
import { format } from 'date-fns'
import { useTheme } from "./ThemeContext";

import Home from "./Home";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import Signup from "./Signup";
import Login from "./Login";
import NewMovie from "./NewMovie";
import MovieDetail from "./MovieDetail";
import UserDetail from "./UserDetail";

function App() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('/movies')
    .then(res => res.json())
    .then(data => setMovies(data))
  }, [])

  useEffect(() => {
    fetch('/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  useEffect(() => {
    fetch('/genres')
    .then(res => res.json())
    .then(data => setGenres(data))
  }, [])

  function handleLogin(user){
    setUser(user)
  }

  function handleLogout(){
    setUser(null)
  }

  function onNewUserSubmit(newUser){
    setUsers([...users, newUser]);
  }

  function clearFilter(){
    setSelectedGenre(null)
  }

  function onNewMovieSubmit(newMovie) {
    const formattedDate = newMovie.release_date ? new Date(newMovie.release_date).toISOString() : null;
  
    const movieData = {
      ...newMovie,
      release_date: formattedDate,
    };
  
    fetch('/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
    .then(res => res.json())
    .then(data => {
      setMovies([...movies, data]);
    })
    .catch(error => console.error('Error:', error));
  }
  

  function handleDeleteMovie(id){
    fetch(`/movies/${id}`, {
      method:'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setMovies((movies) => movies.filter((movie) => movie.id !== id))
      }
    })
  }
  function handleGenreClick(genreId) {
    setSelectedGenre(genreId);
  }

  const moviesToDisplay = movies
  .filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase()))
  .filter(movie => {
    if (!selectedGenre) return true; 
    return movie.moviegenres.some(mg => mg.genre_id === selectedGenre);
  });
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100 text-black'}`}>
      <button onClick={toggleTheme} className="p-2 m-4">
                Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      <NavBar genres={genres} setUser={setUser} searchInput={searchInput} setSearchInput={setSearchInput} users={users} user={user} onLogout={handleLogout} onNewUserSubmit={onNewUserSubmit} onLogin={handleLogin}/>
      <div className="flex justify-center">
      </div>
      <Switch>
        <Route exact path="/">
          <Home setUser={setUser} />
        </Route>
        <Route exact path="/movies">
          <MovieList clearFilter={clearFilter} handleGenreClick={handleGenreClick} genres={genres} movies={moviesToDisplay} user={user} handleDelete={handleDeleteMovie}/>
        </Route>
        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>
        <Route path="/signup">
          <Signup onNewUserSubmit={onNewUserSubmit}/>
        </Route>
        <Route path="/newmovie">
          <NewMovie onSubmit={onNewMovieSubmit} initialValues={{ title: '', release_date: '', director: '', cast: '', description: '', poster_image: '' }} />
        </Route>
        <Route path="/movies/:id" render={(props) => <MovieDetail {...props} movies={movies} />} />
        <Route path="/users/:id" render={(props) => <UserDetail {...props} users={users} />} />
      </Switch>
    </div>
  )
}

export default App;
