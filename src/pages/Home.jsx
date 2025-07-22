import React from "react";
import heroImage from "../assets/hero.jpg";

const Home = () => {
  return (
    <div>
      <img src={heroImage} alt="Hero" className="w-full h-[500px] object-cover" />
      <h1 className="text-4xl font-bold text-center mt-6">Welcome to Load-N-Go</h1>
      <p className="text-center text-lg mt-2">
        Fast, Reliable, and Affordable Logistics Services.
      </p>
    </div>
  );
};

export default Home;
