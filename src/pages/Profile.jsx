// src/pages/Profile.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';

export default function Profile() {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(user?.photoURL || '');

  const updateUserProfile = async () => {
    try {
      await updateProfile(user, { displayName: name, photoURL: photo });
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      <input
        type="text"
        value={name}
        placeholder="Full Name"
        className="border p-2 mb-2 rounded"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={photo}
        placeholder="Photo URL"
        className="border p-2 mb-4 rounded"
        onChange={(e) => setPhoto(e.target.value)}
      />
      <button onClick={updateUserProfile} className="bg-orange-500 text-white px-6 py-2 rounded">Update Profile</button>
    </div>
  );
}
