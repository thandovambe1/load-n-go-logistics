<section id="booking" className="bg-white px-4 py-10 max-w-xl mx-auto">
  <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

  <form ref={form} onSubmit={sendEmail} className="space-y-4">
    <input
      type="text"
      name="from_name"
      placeholder="Your Name"
      required
      className="w-full border border-gray-300 rounded-md p-3"
    />
    <input
      type="email"
      name="from_email"
      placeholder="Your Email"
      required
      className="w-full border border-gray-300 rounded-md p-3"
    />
    <textarea
      name="message"
      placeholder="Your Message"
      rows="4"
      required
      className="w-full border border-gray-300 rounded-md p-3"
    ></textarea>

    <motion.button
      type="submit"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      className="w-full bg-orange-500 text-white py-3 rounded-lg shadow hover:bg-orange-600 transition"
    >
      {loading ? "Sending..." : "Send Message"}
    </motion.button>

    {success && (
      <p className="text-green-600 text-center mt-2">Message sent successfully!</p>
    )}
  </form>
</section>
