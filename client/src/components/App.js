import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import NavBar from "./NavBar";
import MovieList from "./MovieList";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home setUser={setUser} />
        </Route>
        <Route path="/movies">
          <MovieList />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
