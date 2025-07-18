import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result.user);
      setName(result.user.displayName);
    });
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">My Profile</h2>
      {user ? (
        <div>
          <img src={user.photoURL} alt="Profile" className="w-24 rounded-full" />
          <input
            type="text"
            value={name}
            className="border p-2 mt-4"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Profile;
