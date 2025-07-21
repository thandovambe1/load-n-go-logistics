import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [photo, setPhoto] = useState("/src/assets/logo.jpg");

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="flex items-center gap-6">
        <img src={photo} alt="Profile" className="h-24 w-24 rounded-full border-4 border-gray-300" />
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg text-lg"
          />
        </div>
      </div>
    </div>
  );
}
