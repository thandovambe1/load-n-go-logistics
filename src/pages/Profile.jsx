import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p className="p-8 text-center">Please log in first.</p>;
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <img
        src={user.photoURL || "https://via.placeholder.com/100"}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <p className="text-lg">Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
