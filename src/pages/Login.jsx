import React from "react";

const Login = () => {
  return (
    <div className="pt-24 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <button className="w-full bg-orange-500 text-white py-3 rounded mb-4 hover:bg-orange-600">
          Sign in with Google
        </button>
        <p className="text-center text-gray-500">or</p>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4"
          />
          <button className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-900">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
