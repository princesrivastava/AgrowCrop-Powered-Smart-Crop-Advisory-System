import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import CropCalendar from "./components/CropCalendar";
import FAQ from "./components/FAQ";
import MarketPrice from "./components/MarketPrice";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import SignUpPage from "./components/auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";

const AppRoutes = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Public routes – ALWAYS accessible */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
        <Route path="/calendar/:cropId" element={<ProtectedRoute><CropCalendar /></ProtectedRoute>} />
        <Route path="/crop-calendar" element={<ProtectedRoute><CropCalendar /></ProtectedRoute>} />
        <Route path="/market-prices" element={<ProtectedRoute><MarketPrice /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
