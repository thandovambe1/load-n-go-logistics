import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-navy-900 text-white flex justify-between items-center px-6 py-4 shadow-lg">
      <div className="flex items-center space-x-3">
        <img src="/src/assets/logo.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
        <h1 className="text-xl font-bold">Load-N-Go Logistics</h1>
      </div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
        <li><Link to="/bookings" className="hover:text-orange-400">My Bookings</Link></li>
        <li><Link to="/profile" className="hover:text-orange-400">Profile</Link></li>
        <li><Link to="/login" className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">Login</Link></li>
      </ul>
    </nav>
  );
}
