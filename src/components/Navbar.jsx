import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-blue-900">Load-N-Go</h1>
        </div>
        <ul className="flex space-x-8 text-lg font-medium">
          <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
          <li><Link to="/my-bookings" className="hover:text-orange-500">My Bookings</Link></li>
          <li><Link to="/profile" className="hover:text-orange-500">Profile</Link></li>
          <li><Link to="/login" className="hover:text-orange-500">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
