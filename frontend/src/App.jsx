import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Recommendations from './components/Recommendations'
import CropCalendar from './components/CropCalendar'
import FAQ from './components/FAQ'
import MarketPrice from './components/MarketPrice'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import WeatherBackground from './components/WeatherBackground'
import { WeatherProvider } from './context/WeatherContext'

function App() {
  const [token, setToken] = useState(localStorage.getItem('agro_token'))

  if (!token) {
    return <Login onLoginSuccess={(auth) => setToken(auth.token)} />
  }

  return (
    <WeatherProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <WeatherBackground />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/calendar/:cropId" element={<CropCalendar />} />
            <Route path="/crop-calendar" element={<CropCalendar />} />
            <Route path="/market-prices" element={<MarketPrice />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login onLoginSuccess={(auth) => setToken(auth.token)} />} />
          </Routes>
        </div>
      </Router>
    </WeatherProvider>
  )
}

export default App
