import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Load-N-Go</h1>
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/services" className="hover:text-accent">Services</Link>
          <Link to="/contact" className="hover:text-accent">Contact</Link>
          <Link to="/track-driver" className="hover:text-accent">Track Driver</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

