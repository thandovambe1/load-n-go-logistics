import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <img src="/src/assets/logo.jpg" alt="Load-N-Go" className="h-12 w-12 rounded-full" />
        <h1 className="text-2xl font-bold">Load-N-Go Logistics</h1>
      </div>
      <ul className="flex gap-6 text-lg">
        <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
        <li><Link to="/bookings" className="hover:text-orange-400">My Bookings</Link></li>
        <li><Link to="/profile" className="hover:text-orange-400">Profile</Link></li>
        <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
      </ul>
    </nav>
  );
}
