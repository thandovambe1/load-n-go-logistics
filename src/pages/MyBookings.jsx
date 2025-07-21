import React, { useEffect } from "react";

const Bookings = () => {
  useEffect(() => {
    const yoco = new window.YocoSDK({
      publicKey: "pk_test_xxxxxxx" // Replace with your Yoco public key
    });

    const button = document.querySelector("#pay-button");
    if (button) {
      button.addEventListener("click", () => {
        yoco.showPopup({
          amountInCents: 10000, // R100
          currency: "ZAR",
          name: "Load-N-Go",
          description: "Logistics Service",
          callback: (result) => {
            if (result.error) {
              alert("Payment failed: " + result.error.message);
            } else {
              alert("Payment successful! Token: " + result.id);
            }
          }
        });
      });
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <button
        id="pay-button"
        className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Bookings;
