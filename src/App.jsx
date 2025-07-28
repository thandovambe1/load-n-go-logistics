import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import MyBookings from "./pages/MyBookings";
import ContactSupport from "./pages/ContactSupport";

<Route path="/contact-support" element={<ContactSupport />} />

function App() {
  return (
    <div>
      <Hero />
      <Services />
      <MyBookings />
    </div>
  );
}

export default App;
