import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4">
      <img src={logo} alt="Load-N-Go" className="h-12" />
      <ul className="flex gap-6 text-lg">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/partner-register">Partner</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
