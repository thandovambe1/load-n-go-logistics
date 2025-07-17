import React from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png" // Upload your logo to public/logo.png
              alt="Load-N-Go Logo"
              className="h-10"
            />
            <h1 className="text-2xl font-bold text-orange-600">LOAD-N-GO</h1>
          </div>
          <div className="hidden md:flex space-x-6 text-lg">
            <a href="#" className="hover:text-orange-600">Home</a>
            <a href="#" className="hover:text-orange-600">My Bookings</a>
            <a href="#" className="hover:text-orange-600">Track Load</a>
            <a href="#" className="hover:text-orange-600">Contact Support</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white flex flex-col justify-center items-center text-center h-[90vh] px-4 pt-16">
        <h1 className="text-5xl font-bold mb-4">Tech Driven Transit</h1>
        <p className="text-lg max-w-xl mb-6">
          Move loads seamlessly with Load-N-Go Logistics. Reliable. Fast. Tech-powered.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow hover:bg-gray-100">
            Book Now
          </button>
          <button className="bg-black text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-gray-800">
            Pay with Yoco
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Load-N-Go?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>Quick and reliable transportation for all your logistics needs.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p>Know exactly where your load is at any time.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p>Seamless and safe transactions powered by Yoco.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Load-N-Go Logistics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
