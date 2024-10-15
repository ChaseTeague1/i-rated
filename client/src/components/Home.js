import React, { useState } from "react";

function Home({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  return (
    <div>
      <form class="grid-col-1 content-center m-4" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          class="border-2 border-black m-4 rounded-lg"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          class="border-2 border-black m-4 rounded-lg"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label>Role</label>
        <input 
         class="border-2 border-black m-4 rounded-lg"
         type="text"
         id="role"
         value={role}
         onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Home;