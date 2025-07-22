// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDspiXD9hUiHRDOVLhnNoObl7MB_xBoLtk",
  authDomain: "load-n-go-logistics.firebaseapp.com",
  projectId: "load-n-go-logistics",
  storageBucket: "load-n-go-logistics.firebasestorage.app",
  messagingSenderId: "597245927020",
  appId: "1:597245927020:web:b42d81d58e363433578249",
  measurementId: "G-NL5KWT8ZPB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firestore
const db = getFirestore(app);

// ✅ Storage
const storage = getStorage(app);

export { db, storage };
