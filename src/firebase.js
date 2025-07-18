// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDspiXD9hUiHRDOVLhnNoObl7MB_xBoLtk",
  authDomain: "loand-n-go-logistics.firebaseapp.com",
  projectId: "loand-n-go-logistics",
  storageBucket: "loand-n-go-logistics.firebasestorage.app",
  messagingSenderId: "597245927020",
  appId: "1:597245927020:web:b42d81d58e363433578249",
  measurementId: "G-NL5KWT8ZPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
