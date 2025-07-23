imimport { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDspiXD9hUiHRDOVLhnNoObl7MB_xBoLtk",
  authDomain: "loand-n-go-logistics.firebaseapp.com",
  projectId: "loand-n-go-logistics",
  storageBucket: "loand-n-go-logistics.firebasestorage.app",
  messagingSenderId: "597245927020",
  appId: "1:597245927020:web:b42d81d58e363433578249",
  measurementId: "G-NL5KWT8ZPB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
