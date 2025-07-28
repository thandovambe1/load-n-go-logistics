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
              transition={{ duration: 0.5, delay: i
