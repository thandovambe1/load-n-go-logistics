// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"; // adjust path if needed

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        navigate("/login"); // redirect to login if not authenticated
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  if (loading) return <div className="text-center mt-10">Loading...</div>
  return isAuthenticated ? children : null
}
