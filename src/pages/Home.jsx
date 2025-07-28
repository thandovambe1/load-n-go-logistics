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

    emailjs.sendForm('service_gdzxaeo', 'template_hk9853t', form.current, 'GaBDQxhP0ASdqxt-I')
      .then((result) => {
        setSuccess(true);
        setLoading(false);
        form.current.reset();
      }, (error) => {
        alert("Message failed: " + error.text);
        setLoading(false);
      });
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-orange-500">Load-N-Go</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition">
          Book Now
        </button>
      </header>

      {/* Services */}
      <section className="px-4 py-10 max-w-3xl mx-auto">
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
              className="bg-white rounded-xl shadow p-4 flex items-start space-x-4"
            >
              <div className="text-3xl">{service.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
