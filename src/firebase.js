import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
