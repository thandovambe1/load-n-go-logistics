import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-4">Login or Register</h2>
      <input type="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={handleLogin}>Login</button>
      <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={handleRegister}>Register</button>
      <button className="bg-red-500 text-white p-2 rounded" onClick={handleGoogle}>Google Sign-In</button>
    </div>
  );
};

export default Login;
