import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Adjust import to use our AuthProvider

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoaded } = useAuth();
    const location = useLocation();

    if (!isLoaded) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    if (!isAuthenticated) {
        // Redirect to login, but save the location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
