import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import Login from "./Login";
import Genres from "./Genres";

function NavBar({ searchInput, setSearchInput, onLogin, users, user, onLogout, setUser}) {
    const [loginWindow, setLoginWindow] = useState(false)

    function closeLogin(){
        setLoginWindow(false)
    }

    function openLogin(){
        setLoginWindow(true)
    }

    function handleLoginClose(e){
        onLogin(e)
        closeLogin()
    }

    function handleLogout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(() => {
            onLogout()
            setLoginWindow(false)
        })
    }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center bg-green-300 rounded-2xl w-5/6 h-32 border-gray-700 dark:border-white border-2 px-8 dark:bg-gray-700">
        <NavLink
          className="text-white dark:text-green-300 font-bold text-5xl ml-8"
          exact
          to="/"
        >
          I-RATED
        </NavLink>
        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        <NavLink
          className="text-white text-xl dark:text-green-300"
          to="/movies"
        >
          Movies
        </NavLink>
        {
            user && user.username ? (
                <div>
                    <p>Welcome, {user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={openLogin}>Login</button>
                    {loginWindow && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 relative w-96 max-w-full">
                                <button
                                onClick={closeLogin}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                >
                                X
                                </button>
                                <Login setUser={setUser} onLogin={handleLoginClose} />
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        <NavLink
        to="/signup"
        className="text-black"
        >
            Sign Up
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
