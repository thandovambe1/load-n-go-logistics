import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Google Sign-In
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Email/Password Signup
  const registerWithEmail = async (email, password, name) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Email/Password Login
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
