import React, { useState } from "react";

function Signup({ onNewUserSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [profile_picture, setPicture] = useState("");

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
        bio,
        profile_picture
      }),
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
            onNewUserSubmit(user)
            setUsername("")
            setPassword("")
            setRole("")
            setBio("")
            setPicture("")
        });
      }
    });
  }

  return (
    <div className="grid grid-col-1 justify-center items-center">
      <form class="grid grid-col-1 content-center m-4" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          className="border-2 border-black m-4 rounded-lg p-1"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username..."
        />
        <label htmlFor="password">Password</label>
        <input
          className="border-2 border-black m-4 rounded-lg p-1"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="Password..."
        />
        <label>Bio</label>
        <textarea 
            className="border-2 border-black m-4 rounded-lg p-1"
            id="bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio..."
        />
        <input 
            className="border-2 border-black m-4 rounded-lg p-1"
            id="picture"
            type="text"
            value={profile_picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Profile picutre..."
        />
        <label className="underline" htmlFor="role">Role</label>
        <select
          className="border-2 border-black m-4 rounded-lg p-1"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>Select a role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;