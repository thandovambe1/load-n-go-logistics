// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Dummy data — replace with Firebase data later
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+27 123 456 789",
  };

  const deliveries = {
    past: [
      { id: 1, from: "Cape Town", to: "Joburg", date: "2025-05-12", status: "Delivered" },
    ],
    current: [
      { id: 2, from: "Durban", to: "East London", date: "2025-07-28", status: "In Transit" },
    ],
    upcoming: [
      { id: 3, from: "PE", to: "Cape Town", date: "2025-08-02", status: "Scheduled" },
    ],
  };

  const renderDeliveries = (type) => {
    return deliveries[type].length === 0 ? (
      <p className="text-gray-500 text-center">No {type} deliveries</p>
    ) : (
      <ul className="space-y-4">
        {deliveries[type].map((d) => (
          <li key={d.id} className="p-4 bg-white rounded-xl shadow">
            <div className="text-lg font-semibold">{d.from} → {d.to}</div>
            <div className="text-sm text-gray-500">{d.date}</div>
            <div className="text-sm text-orange-600">{d.status}</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">User Dashboard</h1>

        {/* Profile Info */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-between mb-4">
          {["upcoming", "current", "past"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 border"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Delivery List */}
        <div>{renderDeliveries(activeTab)}</div>
      </div>
    </div>
  );
}
