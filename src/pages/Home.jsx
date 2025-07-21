export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full h-[500px] relative">
        <img src="/src/assets/hero.jpg" alt="Hero" className="w-full h-full object-cover rounded-lg shadow-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold text-center">
            Fast, Reliable Logistics at Your Fingertips
          </h1>
        </div>
      </div>
      <p className="mt-6 text-xl text-gray-700">Book your load, track deliveries, and manage everything in one place.</p>
      <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-xl font-semibold">
        Book Now
      </button>
    </div>
  );
}
