

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Recommendations from './components/Recommendations'
import CropCalendar from './components/CropCalendar'
import FAQ from './components/FAQ'
import MarketPrice from './components/MarketPrice'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import SignUpPage from './components/auth/SignUp'
import WeatherBackground from './components/WeatherBackground'
import ProtectedRoute from './components/ProtectedRoute'
import { WeatherProvider } from './context/WeatherContext'
import { AuthProvider, useAuth } from './context/AuthProvider'

console.log("App rendered");

// Inner App component that consumes Auth Context to access isAuthenticated
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Public Routes - Redirect to Home if already authenticated */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />} />

        {/* Protected Routes */}
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

function App() {
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

export default App
