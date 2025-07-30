// /functions/index.js

import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

export const onDriverApplicationCreated = onDocumentCreated("driver_applications/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No document data.");
    return;
  }

  const applicationData = snapshot.data();
  const driverId = applicationData.driverId;

  if (!driverId) {
    console.error("Missing driverId in application data.");
    return;
  }

  const userRef = db.collection("users").doc(driverId);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    console.error(`User ${driverId} not found.`);
    return;
  }

  await userRef.set({
    driverApplication: {
      ...applicationData,
      status: "pending",
      submittedAt: FieldValue.serverTimestamp(),
    },
  }, { merge: true });

  console.log(`Driver application merged for user ${driverId}`);
});
