const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-3 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-3 w-full"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold w-full">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold w-full">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
