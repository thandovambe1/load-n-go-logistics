import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [photo, setPhoto] = useState("/logo.png");

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img src={photo} alt="Profile" className="h-24 w-24 rounded-full mb-4" />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />
      <button className="bg-primary text-white px-6 py-3 rounded-lg">
        Save Changes
      </button>
    </div>
  );
}
