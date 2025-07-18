import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result.user);
      setName(result.user.displayName);
    }).catch((error) => alert(error.message));
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          setName(userCredential.user.email);
        })
        .catch((error) => alert(error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          setName(userCredential.user.email);
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">My Profile</h2>

      {user ? (
        <div>
          {user.photoURL && (
            <img src={user.photoURL} alt="Profile" className="w-24 rounded-full mb-4" />
          )}
          <input
            type="text"
            value={name}
            className="border p-2 mt-4 w-full"
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
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleEmailAuth} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="border p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="border p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-gray-500 underline"
          >
            {isSignUp ? "Already have an account? Login" : "Create an account"}
          </button>
          <hr />
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
