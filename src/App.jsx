import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Hero />
      <section id="book" className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Book Your Load</h2>
          <p className="text-lg text-gray-600 mb-4">Coming soon... 🚚</p>
        </div>
      </section>
    </>
  );
}

export default App;
