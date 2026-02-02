import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import CropCalendar from "./components/CropCalendar";
import FAQ from "./components/FAQ";
import MarketPrice from "./components/MarketPrice";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import SignUpPage from "./components/auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import WeatherBackground from './components/WeatherBackground';
import { WeatherProvider } from './context/WeatherContext';
import { AuthProvider, useAuth } from "./context/AuthProvider";

const AppRoutes = () => {
  const { isLoaded, isAuthenticated } = useAuth();

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
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />} />

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

const App = () => {
  return (
    <AuthProvider>
      <WeatherProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <WeatherBackground />
          <AppRoutes />
        </Router>
      </WeatherProvider>
    </AuthProvider>
  )
}

export default App;
