import React, { useState } from "react";
import { db, storage } from "../firebase"; // ✅ Make sure firebase.js exports these
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const { user } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  if (!user) navigate("/login");
}, [user, navigate]);

export default function PartnerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    address: "",
    vehicleType: "",
    vehicleReg: "",
  });

  const [files, setFiles] = useState({
    photo: null,
    license: null,
    pdp: null,
    insurance: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const uploadedFiles = {};
      for (const key in files) {
        if (files[key]) {
          uploadedFiles[key] = await uploadFile(files[key], key);
        }
      }

      await addDoc(collection(db, "partners"), {
        ...formData,
        ...uploadedFiles,
        createdAt: new Date(),
      });

      setMessage("✅ Registration Successful!");
      setFormData({
        name: "",
        idNumber: "",
        address: "",
        vehicleType: "",
        vehicleReg: "",
      });
      setFiles({ photo: null, license: null, pdp: null, insurance: null });
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("❌ Error submitting form. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Become a Partner Driver</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* ID Number */}
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Residential Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Vehicle Type */}
        <input
          type="text"
          name="vehicleType"
          placeholder="Vehicle Type (e.g., Truck, Van)"
          value={formData.vehicleType}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Vehicle Reg */}
        <input
          type="text"
          name="vehicleReg"
          placeholder="Vehicle Registration"
          value={formData.vehicleReg}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Upload Files */}
        <label className="block font-semibold mt-4">Upload Photo</label>
        <input type="file" name="photo" onChange={handleFileChange} className="w-full" required />

        <label className="block font-semibold mt-4">Upload License</label>
        <input type="file" name="license" onChange={handleFileChange} className="w-full" required />

        <label className="block font-semibold mt-4">Upload PDP</label>
        <input type="file" name="pdp" onChange={handleFileChange} className="w-full" required />

        <label className="block font-semibold mt-4">Upload Vehicle Insurance</label>
        <input type="file" name="insurance" onChange={handleFileChange} className="w-full" required />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          {loading ? "Submitting..." : "Register"}
        </button>

        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
}
