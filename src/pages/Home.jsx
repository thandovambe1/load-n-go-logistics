const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 pt-20">
      <div className="relative w-full max-w-7xl">
        <img src="/hero.jpg" alt="Hero" className="w-full h-[500px] object-cover rounded-2xl shadow-lg" />
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white bg-black/50 p-6 rounded-xl">
          <h1 className="text-5xl font-bold mb-4">Reliable Logistics at Your Fingertips</h1>
          <p className="text-lg mb-6">Book trucks easily, track your loads, and manage deliveries seamlessly.</p>
          <a href="/my-bookings" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
