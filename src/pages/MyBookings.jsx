import React from "react";

const Booking = () => {
  return (
    <section id="book" className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Book Your Move Now</h2>
      <p className="text-gray-600 mb-10 text-lg">Fill in your details and get started in minutes!</p>
      <form className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded-lg p-4"
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full border border-gray-300 rounded-lg p-4"
        />
        <input
          type="text"
          placeholder="Drop-off Location"
          className="w-full border border-gray-300 rounded-lg p-4"
        />
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg shadow-md">
          Confirm Booking
        </button>
      </form>
    </section>
  );
};

export default Booking;
