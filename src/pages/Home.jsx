export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <section className="relative">
        <img src="/src/assets/hero.jpg" alt="Hero" className="w-full h-[400px] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">Fast & Reliable Delivery</h1>
          <p className="text-lg mb-6">Book a delivery in just a few clicks!</p>
          <a href="/bookings" className="bg-orange-500 px-6 py-3 rounded text-white font-semibold hover:bg-orange-600">
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
}
