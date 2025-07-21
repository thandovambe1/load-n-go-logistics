export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button className="w-full bg-secondary text-white p-3 rounded-lg mb-4">
          Sign in with Google
        </button>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
        />
        <button className="w-full bg-primary text-white p-3 rounded-lg">
          Login
        </button>
      </div>
    </div>
  );
}
