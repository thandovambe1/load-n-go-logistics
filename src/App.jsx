import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

// Inside App component:
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/bookings" element={<Bookings />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Login />} />
</Routes>
