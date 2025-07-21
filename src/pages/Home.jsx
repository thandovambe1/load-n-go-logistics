export default function Home() {
  return (
    <div className="text-center p-10">
      <img
        src="/hero.jpg"
        alt="Hero"
        className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-6"
      />
      <h2 className="text-4xl font-bold mb-4">Move Anything, Anytime!</h2>
      <p className="text-lg text-gray-700 mb-6">
        Book your reliable logistics partner in just a few clicks.
      </p>
      <a
        href="/bookings"
        className="bg-secondary text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-500"
      >
        Book Now
      </a>
    </div>
  );
}
