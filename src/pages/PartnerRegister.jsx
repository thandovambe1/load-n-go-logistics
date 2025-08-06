import React, { useState } from "react"
import { db, storage } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const PartnerRegister = () => {
  const [name, setName] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let fileURL = ""

    if (file) {
      const storageRef = ref(storage, `partners/${file.name}`)
      await uploadBytes(storageRef, file)
      fileURL = await getDownloadURL(storageRef)
    }

    await addDoc(collection(db, "partners"), {
      name,
      vehicleType,
      fileURL
    })

    alert("Partner registered successfully!")
    setName("")
    setVehicleType("")
    setFile(null)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Partner Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-accent text-white px-6 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}

export default PartnerRegister
