import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Login / Register</h1>

      <button
        onClick={loginWithGoogle}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Sign in with Google
      </button>

      <div className="border-t mt-4 pt-4">
        <input
          className="border p-2 mb-2 w-64"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-64"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 mb-2 w-64"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => registerWithEmail(email, password, name)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
          <button
            onClick={() => loginWithEmail(email, password)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
