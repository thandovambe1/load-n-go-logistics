// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDspiXD9hUiHRDOVLhnNoObl7MB_xBoLtk",
  authDomain: "loand-n-go-logistics.firebaseapp.com",
  projectId: "loand-n-go-logistics",
  storageBucket: "loand-n-go-logistics.appspot.com",
  messagingSenderId: "597245927020",
  appId: "1:597245927020:web:b42d81d58e363433578249",
  measurementId: "G-NL5KWT8ZPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export all services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
