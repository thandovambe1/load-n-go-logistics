import { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email] = useState("johndoe@example.com");

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">My Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <img src="/default-profile.png" alt="Profile" className="h-24 w-24 rounded-full border mb-4" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full text-center mb-3"
          />
          <p className="text-gray-600">{email}</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold w-full">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
