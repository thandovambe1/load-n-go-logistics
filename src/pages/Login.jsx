// src/pages/Login.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Logged in with Google!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4 mb-4">
        <button onClick={handleEmailLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <button onClick={handleEmailSignup} className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
      </div>
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded">Sign in with Google</button>
    </div>
  );
}
