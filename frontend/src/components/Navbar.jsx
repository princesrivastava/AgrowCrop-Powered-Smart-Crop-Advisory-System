
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserButton, useAuth } from "@clerk/clerk-react";
import ThemeToggle from './ThemeToggle'
import { useWeather } from '../context/WeatherContext'
import { NavbarWeatherIcon, WeatherStatusIcon } from './WeatherIcons'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          🌾 AgrowCrop
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'bar bar-active' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar bar-active' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar bar-active' : 'bar'}></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/recommendations" onClick={() => setIsMenuOpen(false)}>Recommendations</Link></li>
          <li><Link to="/market-prices" onClick={() => setIsMenuOpen(false)}>Market Prices</Link></li>
          <li><Link to="/crop-calendar" onClick={() => setIsMenuOpen(false)}>Crop Calendar</Link></li>
          <li><Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link></li>
          <li className="theme-toggle-item">
            <ThemeToggle />
          </li>
          <li className="weather-icon-item">
            <span
              className={`weather-icon ${isWeatherVisible ? 'weather-icon-active' : ''}`}
              onClick={() => {
                toggleWeather();
                setIsMenuOpen(false);
              }}
              title={isWeatherVisible ? "Hide Weather" : "Show Weather"}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {weather && weather.weather && weather.weather[0] ? (
                <WeatherStatusIcon
                  type={
                    weather.weather[0].main === "Rain" ? "rain" :
                      weather.weather[0].main === "Drizzle" ? "rain" :
                        weather.weather[0].main === "Thunderstorm" ? "rain" :
                          weather.weather[0].main === "Clouds" ? "cloud" :
                            weather.weather[0].main === "Snow" ? "winter" :
                              "sunny"
                  }
                  size={28}
                />
              ) : (
                <NavbarWeatherIcon size={28} />
              )}
            </span>
          </li>
          <li>
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

