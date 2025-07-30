const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
initializeApp({
credential: applicationDefault(),
});

const db = getFirestore();

// Configure email transporter
const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "your-email@gmail.com", // 🔁 Replace with your Gmail
pass: "your-email-password-or-app-password" // 🔁 Use Gmail App Password
}
});

// ─────────────────────────────────────────────
// 1️⃣ Driver Application Listener
// ─────────────────────────────────────────────

exports.onDriverApplicationCreated = onDocumentCreated(
"driver_applications/{docId}",
async (event) => {
const doc = event.data.data();
const docId = event.params.docId;

if (!doc) {
  console.error("No document data found.");
  return;
}

console.log(`New driver application received. ID: ${docId}`);

const requiredFields = [
  "fullName", "email", "phoneNumber", "vehicleType", "licenseNumber",
  "vehicleRegistration", "driverLicenseURL", "vehiclePictureURL"
];

const missingFields = requiredFields.filter((field) => !doc[field]);

if (missingFields.length > 0) {
  console.warn(`Missing required fields: ${missingFields.join(", ")}`);
  await db.collection("driver_applications").doc(docId).update({
    status: "rejected",
    rejectionReason: `Missing fields: ${missingFields.join(", ")}`
  });
  return;
}

await db.collection("driver_applications").doc(docId).update({
  status: "pending"
});

console.log("All required fields present. Application marked as pending.");

const mailOptions = {
  from: "your-email@gmail.com", // 🔁 Replace
  to: "admin@loadngo.co.za",    // 🔁 Replace with your admin email
  subject: "New Driver Application Received",
  text: `A new driver application has been submitted by ${doc.fullName} (${doc.email}).\n\nVisit the dashboard to review.`
};

try {
  await transporter.sendMail(mailOptions);
  console.log("Notification email sent successfully.");
} catch (error) {
  console.error("Error sending email notification:", error);
}
}
);

// ─────────────────────────────────────────────
// 2️⃣ Delivery Request Broadcast Function
// ─────────────────────────────────────────────

exports.onDeliveryRequestCreated = onDocumentCreated(
"delivery_requests/{requestId}",
async (event) => {
const request = event.data.data();
const requestId = event.params.requestId;

if (!request) {
  console.error("No delivery request data found.");
  return;
}

console.log(`New delivery request created. ID: ${requestId}`);

// Get approved drivers
const driverSnap = await db.collection("driver_partners")
  .where("status", "==", "approved")
  .get();

if (driverSnap.empty) {
  console.warn("No approved drivers found.");
  return;
}

const notifyPromises = [];

driverSnap.forEach((doc) => {
  const driver = doc.data();
  const email = driver.email;

  const mailOptions = {
    from: "your-email@gmail.com", // 🔁 Replace
    to: email,
    subject: "New Delivery Request Available",
    text: `A new delivery request is available.
Pickup Location: ${request.pickupLocation}
Destination: ${request.destination}
Pickup Time: ${request.pickupTime}
Price: R${request.price}

Visit your Load-N-Go driver portal to accept the job.`
};

javascript
Copy
Edit
  // Send notification
  notifyPromises.push(transporter.sendMail(mailOptions));

  // Log the broadcast
  db.collection("delivery_requests")
    .doc(requestId)
    .collection("broadcasts")
    .doc(doc.id)
    .set({
      driverId: doc.id,
      driverEmail: email,
      timestamp: new Date(),
      status: "sent"
    });
});

try {
  await Promise.all(notifyPromises);
  console.log("All drivers notified.");
} catch (err) {
  console.error("Error sending notifications:", err);
}
}
);