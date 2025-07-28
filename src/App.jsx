import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';

function App() {
return (
<Router>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/contact" element={<Contact />} />
<Route path="/bookings" element={<MyBookings />} />
<Route path="/dashboard" element={<Dashboard />} />
</Routes>
</Router>
);
}
