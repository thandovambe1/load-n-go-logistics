import React from "react";
import "./App.css";
import logo from "./assets/logo.png"; // make sure you upload your logo to src/assets

function App() {
  return (
    <div className="app-container" style={{ fontFamily: "Arial, sans-serif", textAlign: "center", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#001f3f", padding: "20px", color: "#fff" }}>
        <img src={logo} alt="Load-N-Go Logo" style={{ height: "80px" }} />
        <h1 style={{ color: "#FF6600" }}>Load-N-Go Logistics</h1>
        <p style={{ marginTop: "10px" }}>Tech Driven Transit</p>
      </header>

      <main style={{ padding: "40px" }}>
        <h2 style={{ color: "#001f3f" }}>Book Your Load with Ease!</h2>
        <p style={{ maxWidth: "600px", margin: "20px auto" }}>
          We provide fast, reliable, and tech-driven logistics solutions to meet your business and personal transport needs.
        </p>
        <a
          href="#"
          style={{
            display: "inline-block",
            padding: "15px 30px",
            backgroundColor: "#FF6600",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Book Now
        </a>
      </main>

      <footer style={{ backgroundColor: "#f1f1f1", padding: "20px", marginTop: "40px" }}>
        <p>Contact Support: <a href="mailto:support@load-n-go.com">support@load-n-go.com</a></p>
        <p>© {new Date().getFullYear()} Load-N-Go Logistics</p>
      </footer>
    </div>
  );
}

export default App;
