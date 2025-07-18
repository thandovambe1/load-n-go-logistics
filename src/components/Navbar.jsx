import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[var(--primary)] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Load-N-Go</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-[var(--accent)]">Home</Link>
        <Link to="/bookings" className="hover:text-[var(--accent)]">My Bookings</Link>
        <Link to="/contact" className="hover:text-[var(--accent)]">Contact</Link>
        <Link to="/profile" className="hover:text-[var(--accent)]">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
