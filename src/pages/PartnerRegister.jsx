import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PartnerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    address: "",
    vehicleType: "",
    registration: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = "";
    if (file) {
      const storageRef = ref(storage, `partners/${file.name}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, "partners"), { ...formData, photoURL });
    alert("Partner Registered!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Register as a Driver</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-3" />
      <input name="idNumber" placeholder="ID Number" onChange={handleChange} className="border p-2 w-full mb-3" />
      <input name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full mb-3" />
      <input name="vehicleType" placeholder="Vehicle Type" onChange={handleChange} className="border p-2 w-full mb-3" />
      <input name="registration" placeholder="Registration" onChange={handleChange} className="border p-2 w-full mb-3" />
      <input type="file" onChange={handleFile} className="mb-3" />
      <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default PartnerRegister;
