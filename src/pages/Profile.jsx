import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [photo, setPhoto] = useState("");

  return (
    <div className="page profile">
      <h1>My Profile</h1>
      <img src={photo || "/default-avatar.png"} alt="Profile" width="100" />
      <input type="file" onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button>Update Profile</button>
    </div>
  );
};

export default Profile;
