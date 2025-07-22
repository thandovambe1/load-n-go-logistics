import React, { useState } from "react";
import { db, storage } from "../firebase"; // ✅ Ensure firebase.js is set up
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PartnerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    address: "",
    vehicleType: "",
    vehicleReg: "",
  });

  const [photo, setPhoto] = useState(null);
  const [license, setLicense] = useState(null);
  const [pdp, setPdp] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const uploadFile = async (file, path) => {
    const fileRef = ref(storage, `partners/${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload files
      const photoURL = photo ? await uploadFile(photo, "photo") : "";
      const licenseURL = license ? await uploadFile(license, "license") : "";
      const pdpURL = pdp ? await uploadFile(pdp, "pdp") : "";
      const insuranceURL = insurance ? await uploadFile(insurance, "insurance") : "";

      // Save to Firestore
      await addDoc(collection(db, "partners"), {
        ...formData,
        photoURL,
        licenseURL,
        pdpURL,
        insuranceURL,
        createdAt: new Date(),
      });

      alert("Partner registered successfully!");
      setFormData({ name: "", idNumber: "", address: "", vehicleType: "", vehicleReg: "" });
      setPhoto(null);
      setLicense(null);
      setPdp(null);
      setInsurance(null);
    } catch (error) {
      console.error(error);
      alert("Error registering partner");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Partner Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name & Surname" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="address" placeholder="Residential Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>
        <input type="text" name="vehicleReg" placeholder="Vehicle Registration" value={formData.vehicleReg} onChange={handleChange} className="w-full p-2 border rounded" required />

        {/* File Uploads */}
        <label>Upload Photo:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setPhoto)} className="w-full p-2 border rounded" required />

        <label>Upload License:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setLicense)} className="w-full p-2 border rounded" required />

        <label>Upload PDP:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setPdp)} className="w-full p-2 border rounded" />

        <label>Upload Vehicle Insurance:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setInsurance)} className="w-full p-2 border rounded" />

        <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PartnerRegister;
