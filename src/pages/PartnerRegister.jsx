// src/pages/PartnerRegister.jsx
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PartnerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    idNumber: "",
    address: "",
    vehicleType: "",
    vehicleReg: "",
    license: "",
    pdp: "",
    insurance: ""
  });

  const [files, setFiles] = useState({
    photo: null,
    idDocument: null,
    licenseDoc: null,
    insuranceDoc: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload selection
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // ✅ Upload file to Firebase Storage
  const uploadFile = async (file, folder) => {
    const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  // ✅ Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Upload files to Firebase Storage
      const photoURL = files.photo ? await uploadFile(files.photo, "photos") : "";
      const idDocURL = files.idDocument ? await uploadFile(files.idDocument, "idDocs") : "";
      const licenseURL = files.licenseDoc ? await uploadFile(files.licenseDoc, "licenses") : "";
      const insuranceURL = files.insuranceDoc ? await uploadFile(files.insuranceDoc, "insurance") : "";

      // Save to Firestore
      await addDoc(collection(db, "drivers"), {
        ...formData,
        photoURL,
        idDocURL,
        licenseURL,
        insuranceURL,
        createdAt: new Date()
      });

      setMessage("✅ Driver registered successfully!");
      setFormData({
        name: "",
        surname: "",
        idNumber: "",
        address: "",
        vehicleType: "",
        vehicleReg: "",
        license: "",
        pdp: "",
        insurance: ""
      });
      setFiles({ photo: null, idDocument: null, licenseDoc: null, insuranceDoc: null });
    } catch (error) {
      console.error(error);
      setMessage("❌ Error registering driver. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Partner Driver Registration</h2>

        {message && <p className="text-center mb-4 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Inputs */}
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="address" placeholder="Residential Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="vehicleType" placeholder="Vehicle Type" value={formData.vehicleType} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="vehicleReg" placeholder="Vehicle Registration" value={formData.vehicleReg} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="license" placeholder="Driver's License Number" value={formData.license} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="pdp" placeholder="PDP Number" value={formData.pdp} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="insurance" placeholder="Insurance Provider" value={formData.insurance} onChange={handleChange} className="w-full p-2 border rounded" />

          {/* File Inputs */}
          <label className="block font-semibold">Upload Photo:</label>
          <input type="file" name="photo" onChange={handleFileChange} className="w-full p-2 border rounded" />

          <label className="block font-semibold">Upload ID Document:</label>
          <input type="file" name="idDocument" onChange={handleFileChange} className="w-full p-2 border rounded" />

          <label className="block font-semibold">Upload Driver's License:</label>
          <input type="file" name="licenseDoc" onChange={handleFileChange} className="w-full p-2 border rounded" />

          <label className="block font-semibold">Upload Insurance Document:</label>
          <input type="file" name="insuranceDoc" onChange={handleFileChange} className="w-full p-2 border rounded" />

          {/* Submit Button */}
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600" disabled={loading}>
            {loading ? "Registering..." : "Register Driver"}
          </button>
        </form>
      </div>
    </div>
  );
}
