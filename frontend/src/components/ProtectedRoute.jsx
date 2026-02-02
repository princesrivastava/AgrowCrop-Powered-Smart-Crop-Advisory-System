import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoaded } = useAuth();
    const location = useLocation();

    if (!isLoaded) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default ProtectedRoute;
