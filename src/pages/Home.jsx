import React from "react";
import heroImage from "../assets/hero.png"; // Upload hero.png in assets

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white">
      <img
        src={heroImage}
        alt="Hero"
        className="w-full max-h-[400px] object-cover rounded-xl"
      />
      <h1 className="text-4xl font-bold text-[var(--primary)] mt-6">
        Fast. Reliable. Load-N-Go!
      </h1>
      <p className="text-gray-600 mt-2 text-lg">
        Book your delivery now and track it live.
      </p>
    </div>
  );
};

export default Home;
