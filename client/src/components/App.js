import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState("")

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

  function handleLogin(user){
    setUser(user)
  }

  function handleLogout(){
    setUser(null)
  }

  function onNewUserSubmit(newUser){
    setUsers([...users, newUser]);
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

  const moviesToDisplay = movies.filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div className="bg-gray-700 min-h-screen">
      <NavBar setUser={setUser} searchInput={searchInput} setSearchInput={setSearchInput} users={users} user={user} onLogout={handleLogout} onNewUserSubmit={onNewUserSubmit} onLogin={handleLogin}/>
      <Switch>
        <Route exact path="/">
          <Home setUser={setUser} />
        </Route>
        <Route path="/movies">
          <MovieList movies={moviesToDisplay} user={user} handleDelete={handleDeleteMovie}/>
        </Route>
        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>
        <Route path="/signup">
          <Signup onNewUserSubmit={onNewUserSubmit}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
