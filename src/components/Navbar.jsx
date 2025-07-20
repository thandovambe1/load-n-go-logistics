// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white flex justify-between items-center px-6 py-4 shadow-lg">
      <h1 className="text-2xl font-bold">Load-N-Go</h1>
      <ul className="flex space-x-6 text-lg">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/bookings">My Bookings</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
