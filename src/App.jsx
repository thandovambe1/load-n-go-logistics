import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";

// ✅ Navbar Component
const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center px-6 py-4 z-50">
    <Link to="/" className="text-2xl font-bold text-blue-600">Load-N-Go</Link>
    <div className="space-x-6">
      <Link to="/" className="hover:text-blue-500">Home</Link>
      <Link to="/contact" className="hover:text-blue-500">Contact</Link>
      <Link to="/track" className="hover:text-blue-500">Track</Link>
    </div>
  </nav>
);

// ✅ Hero Section
const Hero = () => (
  <section className="pt-24 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-20">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl font-bold mb-6"
    >
      Move Anything, Anytime
    </motion.h1>
    <p className="text-lg md:text-xl mb-6">Fast, reliable logistics at your fingertips.</p>
    <div className="space-x-4">
      <a href="#booking" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-200">
        Book a Delivery
      </a>
    </div>
  </section>
);

// ✅ Services Section
const Services = () => {
  const services = [
    "Furniture/Home Removals",
    "Office Deliveries",
    "International Removals",
    "Storage Services",
    "Car Transport",
    "Motorcycle Transport"
  ];
  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl"
          >
            {service}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ✅ Booking Form with Google Maps
const Booking = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [directions, setDirections] = useState(null);
  const [eta, setEta] = useState("");

  const handleRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const time = result.routes[0].legs[0].duration.text;
          setEta(time);
        }
      }
    );
  };

  return (
    <section id="booking" className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Book a Delivery</h2>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <div className="flex flex-col items-center space-y-4">
          <Autocomplete>
            <input
              className="border px-4 py-2 rounded w-80"
              placeholder="Pickup Location"
              onBlur={(e) => setPickup(e.target.value)}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              className="border px-4 py-2 rounded w-80"
              placeholder="Dropoff Location"
              onBlur={(e) => setDropoff(e.target.value)}
            />
          </Autocomplete>
          <button
            onClick={handleRoute}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Calculate ETA
          </button>
          {eta && (
            <p className="text-lg mt-4 flex items-center justify-center">
              <Clock className="mr-2" /> ETA: {eta}
            </p>
          )}
          <div className="w-full h-64 mt-6">
            <GoogleMap
              center={{ lat: -26.2041, lng: 28.0473 }} // Johannesburg as default
              zoom={10}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
        </div>
      </LoadScript>
    </section>
  );
};

// ✅ FAQ Section
const FAQ = () => {
  const faqs = [
    { q: "How do I book?", a: "Use the booking form above." },
    { q: "Do you offer international moves?", a: "Yes, across major regions." }
  ];
  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="bg-white shadow p-4 rounded">
            <summary className="cursor-pointer font-semibold">{faq.q}</summary>
            <p className="mt-2">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

// ✅ Floating WhatsApp Button
const WhatsAppButton = () => (
  <a
    href="https://wa.me/27712345678"
    className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MessageCircle className="text-white w-6 h-6" />
  </a>
);

// ✅ Contact Page
const Contact = () => (
  <div className="pt-24 text-center">
    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
    <p>Email: support@load-n-go.com | Phone: +27 123 456 789</p>
  </div>
);

// ✅ Track Page Placeholder
const TrackDriver = () => (
  <div className="pt-24 text-center">
    <h1 className="text-3xl font-bold">Track Your Driver (Coming Soon)</h1>
  </div>
);

// ✅ Main App
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Booking />
              <FAQ />
              <WhatsAppButton />
            </>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track" element={<TrackDriver />} />
      </Routes>
    </Router>
  );
}
