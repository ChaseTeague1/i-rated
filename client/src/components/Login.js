import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login({ setUser, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
            setUser(user)
            history.push('/')
        });
      }
    });
  }

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg"
      >
        <h1 className="flex justify-center font-bold text-2xl mb-6">Login</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <input
            className="border-2 rounded-md border-gray-300 w-full p-2 mt-1"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            className="border-2 rounded-md border-gray-300 w-full p-2 mt-1"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-400 text-white w-full p-2 rounded-md mt-4 hover:bg-green-500"
        >
          Login
        </button>
      </form>
    </div>

  );
}
export default Login;