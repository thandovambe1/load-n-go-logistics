import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { app } from "./firebase"; // your firebase config file

// Firebase init
const auth = getAuth(app);
const db = getFirestore(app);

// Context for auth (optional for cleaner code, but here simple)
function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // Get extra user data from Firestore
        const userDoc = await getDoc(doc(db, "users", u.uid));
        setUser({ uid: u.uid, email: u.email, ...userDoc.data() });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return user;
}

// Protected Route Wrapper
function PrivateRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// NavBar Component
function NavBar({ user, onLogout }) {
  return (
    <nav style={{ backgroundColor: "#001F4D", padding: "15px", color: "white" }}>
      <Link to="/" style={{ marginRight: 20, color: "white", fontWeight: "bold", textDecoration: "none" }}>
        Load-N-Go
      </Link>
      <Link to="/" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>
        Home
      </Link>
      {user && (
        <>
          <Link to="/bookings" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>
            My Bookings
          </Link>
          <Link to="/profile" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>
            Profile
          </Link>
          <button
            onClick={onLogout}
            style={{
              background: "orange",
              border: "none",
              padding: "8px 15px",
              borderRadius: 6,
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </>
      )}
      {!user && (
        <Link to="/login" style={{ marginLeft: 15, color: "white", textDecoration: "none" }}>
          Login
        </Link>
      )}
    </nav>
  );
}

// Login & Signup Component
function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Create user doc if not exists
      const userDocRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        await setDoc(userDocRef, { name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL || "" });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailPassword = async () => {
    setError("");
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create user doc
        await setDoc(doc(db, "users", userCredential.user.uid), { name: "", email, photoURL: "" });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "10px 0" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "10px 0" }}
      />
      <button onClick={handleEmailPassword} style={{ width: "100%", padding: 12, backgroundColor: "#ff6600", border: "none", color: "white", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>
        {isSignup ? "Create Account" : "Login"}
      </button>
      <button
        onClick={handleGoogleSignIn}
        style={{ width: "100%", padding: 12, backgroundColor: "#004AAD", border: "none", color: "white", borderRadius: 6, fontWeight: "bold", marginTop: 10, cursor: "pointer" }}
      >
        Sign in with Google
      </button>
      <p style={{ marginTop: 15 }}>
        {isSignup ? "Already have an account? " : "Don't have an account? "}
        <span
          onClick={() => setIsSignup(!isSignup)}
          style={{ color: "#ff6600", cursor: "pointer", fontWeight: "bold" }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}

// Profile Page (editable)
function Profile({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Update profile in Firebase Auth and Firestore
  const saveProfile = async () => {
    setMessage("");
    try {
      // Update Firebase Auth displayName and photoURL
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      // Update Firestore user doc
      await setDoc(doc(db, "users", user.uid), { name, photoURL, email: user.email }, { merge: true });
      setMessage("Profile updated!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Handle photo upload - simplified: input type file + upload to Firebase Storage (optional, or you can use direct URL)
  // For now, let's keep it simple with URL input for profile pic
  // Uploading Firebase Storage would need extra setup, I can help with that next if you want.

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2>My Profile</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 10, margin: "10px 0" }} />
      <label>Profile Photo URL:</label>
      <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} style={{ width: "100%", padding: 10, margin: "10px 0" }} />
      {photoURL && <img src={photoURL} alt="Profile" style={{ maxWidth: 150, borderRadius: "50%", marginBottom: 10 }} />}
      <button onClick={saveProfile} style={{ padding: 12, backgroundColor: "#ff6600", border: "none", color: "white", borderRadius: 6, cursor: "pointer", fontWeight: "bold", width: "100%" }}>
        Save Profile
      </button>
      {message && <p style={{ marginTop: 10, color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

// Home Page
function Home() {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Welcome to Load-N-Go Logistics</h1>
      <p>Fast, reliable delivery at your fingertips.</p>
      {/* Add hero image and booking form or call to action here */}
    </div>
  );
}

// Contact Page
function Contact() {
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Contact Support</h2>
      <p>Need help? Reach out to us at support@loadngo.com or via WhatsApp.</p>
      {/* WhatsApp button can be floating elsewhere */}
    </div>
  );
}

// Bookings Page - list user bookings and new booking form with Yoco payment button
function Bookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load bookings from Firestore
  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setBookings(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBookings();
  }, [user]);

  // Add new booking
  const addBooking = async () => {
    if (!pickup || !destination || !date || !time) {
      setMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        pickup,
        destination,
        date,
        time,
        status: "Pending",
        createdAt: new Date(),
      });
      setMessage("Booking created!");
      setPickup("");
      setDestination("");
      setDate("");
      setTime("");
      // Refresh bookings
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setBookings(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setMessage("Error: " + err.message);
    }
    setLoading(false);
  };

  // TODO: Integrate Yoco payment button here, with payment success callback creating the booking officially
  // For now, we just create the booking immediately

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, background: "white", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2>My Bookings</h2>
      <div>
        <input placeholder="Pickup Address" value={pickup} onChange={(e) => setPickup(e.target.value)} style={{ width: "100%", padding: 10, margin: "10px 0" }} />
        <input placeholder="Destination Address" value={destination} onChange={(e) => setDestination(e.target.value)} style={{ width: "100%", padding: 10, margin: "10px 0" }} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: 10, margin: "10px 0" }} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ padding: 10, margin: "10px 0" }} />
        <button onClick={addBooking} disabled={loading} style={{ width: "100%", backgroundColor: "#ff6600", color: "white", padding: 12, border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>
          Create Booking
        </button>
        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </div>
      <hr style={{ margin: "20px 0" }} />
      <h3>Your Bookings</h3>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((b) => (
        <div key={b.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
          <p><b>Pickup:</b> {b.pickup}</p>
          <p><b>Destination:</b> {b.destination}</p>
          <p><b>Date:</b> {b.date}</p>
          <p><b>Time:</b> {b.time}</p>
          <p><b>Status:</b> {b.status}</p>
        </div>
      ))}
    </div>
  );
}

// Main App
export default function App() {
  const user = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <NavBar user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={<PrivateRoute user={user}><Profile user={user} /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute user={user}><Bookings user={user} /></PrivateRoute>} />
        <Route path="/contact" element={<Contact />} />
        {/* Redirect unknown */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
