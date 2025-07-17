import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      {/* Navbar */}
      <header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Load-N-Go Logo" />
          <h1 style={{ marginLeft: "10px" }}>LOAD-N-GO</h1>
        </div>
        <nav>
          <a href="#">Home</a>
          <a href="#">My Bookings</a>
          <a href="#">Track Load</a>
          <a href="#">Contact Support</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Tech Driven Transit</h1>
        <p>Reliable, Fast, and Secure Logistics Services</p>
        <button>Book Now</button>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Get your loads delivered quickly and efficiently.</p>
        </div>
        <div className="feature-card">
          <h3>Track Your Load</h3>
          <p>Real-time updates on your deliveries anytime.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>Safe and easy transactions with Yoco.</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Load-N-Go Logistics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
