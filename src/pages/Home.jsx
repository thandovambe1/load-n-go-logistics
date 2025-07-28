import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Furniture/Home Removals",
    description: "Safe and reliable home relocation.",
    icon: "🏠",
  },
  {
    title: "Appliance Delivery",
    description: "We deliver heavy appliances hassle-free.",
    icon: "📦",
  },
  {
    title: "Office Furniture Delivery",
    description: "Move your office efficiently.",
    icon: "🚚",
  },
  {
    title: "Car Transport",
    description: "We transport vehicles securely.",
    icon: "🚗",
  },
  {
    title: "Motorcycle Transport",
    description: "Fast and safe bike delivery.",
    icon: "🏍️",
  },
];

export default function Home() {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_gdzxaeo',
        'template_hk9853t',
        form.current,
        'GaBDQxhP0ASdqxt-I'
      )
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          alert("Message failed: " + error.text);
          setLoading(false);
        }
      );
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-orange-500">Load-N-Go</h1>
        <div className="flex gap-4">
          <a
            href="/dashboard"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Dashboard
          </a>
          <a
            href="/book"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 text-center bg-orange-50">
        <h2 className="text-4xl font-bold mb-2">Your Delivery, Our Priority</h2>
        <p className="text-gray-600 mb-6">
          Fast, safe, and reliable logistics services across South Africa.
        </p>
        <a
          href="#book"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Book Your Delivery
        </a>
      </section>

      {/* Services */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Our Services</h2>
        <p className="text-center text-gray-500 mb-6">
          We cover all your transport needs.
        </p>
        <div className="space-y-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-4 rounded shadow flex items-center gap-4"
            >
              <div className="text-3xl">{service.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="px-6 py-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Book Now</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-xl mx-auto bg-gray-50 p-6 rounded-lg shadow space-y-4"
        >
          <input
            type="text"
            name="pickup"
            placeholder="Pickup Location"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="datetime-local"
            name="time"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition w-full"
          >
            {loading ? "Sending..." : "Submit Booking"}
          </button>
          {success && (
            <p className="text-green-600 text-center">Booking sent successfully!</p>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Load-N-Go Logistics. All rights reserved.
      </footer>
    </div>
  );
}
