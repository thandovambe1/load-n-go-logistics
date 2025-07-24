import { motion } from "framer-motion";

export default function Hero() {
  const scrollToBooking = () => {
    const section = document.getElementById("book");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/assets/hero.jpg"
        alt="Load-N-Go Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Move Anything, Anytime.
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-gray-200">
          Fast, reliable, and affordable logistics solutions at your fingertips.
        </p>
        <motion.button
          onClick={scrollToBooking}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition"
        >
          Book a Load Now
        </motion.button>
      </motion.div>
    </section>
  );
}
