import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, allowGuests = false }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated || allowGuests) {
    return children;
  }

  return <Navigate to="/overall" />;
};

export default ProtectedRoute;