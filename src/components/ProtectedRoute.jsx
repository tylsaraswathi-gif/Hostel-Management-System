import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;