import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-3 border rounded mb-4" />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-4" />
        <button className="w-full bg-blue-900 text-white p-3 rounded font-bold hover:bg-blue-800">
          Login
        </button>
        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="#" className="text-orange-500">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
