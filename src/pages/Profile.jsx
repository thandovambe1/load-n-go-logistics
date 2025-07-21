import React from "react";

const Profile = () => {
  return (
    <div className="pt-24 px-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>
      <div className="bg-white p-6 rounded shadow-md max-w-lg">
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
