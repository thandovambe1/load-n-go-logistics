import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, loginWithGoogle, loginWithEmail, registerWithEmail, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!user) {
    return (
      <div className="page profile">
        <h1>Login / Register</h1>
        <button onClick={loginWithGoogle}>Sign in with Google</button>
        <hr />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => loginWithEmail(email, password)}>Login</button>
        <button onClick={() => registerWithEmail(email, password)}>Register</button>
      </div>
    );
  }

  return (
    <div className="page profile">
      <h1>My Profile</h1>
      <img
        src={user.photoURL || "/default-avatar.png"}
        alt="Profile"
        width="100"
      />
      <p>Name: {user.displayName || "N/A"}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
