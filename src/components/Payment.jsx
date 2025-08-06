import React from "react"

const Payment = () => {
  const pay = () => {
    const yoco = new window.YocoSDK({
      publicKey: "pk_test_your_yoco_key"
    })

    yoco.showPopup({
      amountInCents: 5000, // Example R50
      currency: "ZAR",
      name: "Load-N-Go Logistics",
      description: "Booking Payment",
      callback: (result) => {
        if (result.error) {
          alert("Payment failed: " + result.error.message)
        } else {
          alert("Payment successful!")
        }
      }
    })
  }

  return (
    <button
      onClick={pay}
      className="bg-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600"
    >
      Pay Now
    </button>
  )
}

export default Payment
