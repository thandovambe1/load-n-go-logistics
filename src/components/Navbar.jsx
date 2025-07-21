import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full" />
        <h1 className="text-2xl font-bold">Load-N-Go</h1>
      </div>
      <ul className="flex gap-6 text-lg">
        <li><Link to="/" className="hover:text-secondary">Home</Link></li>
        <li><Link to="/bookings" className="hover:text-secondary">My Bookings</Link></li>
        <li><Link to="/profile" className="hover:text-secondary">Profile</Link></li>
        <li><Link to="/login" className="hover:text-secondary">Login</Link></li>
      </ul>
    </nav>
  );
}
