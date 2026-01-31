import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useWeather } from '../context/WeatherContext'
import './WeatherBackground.css'

const WeatherBackground = () => {
    const { weather, loading } = useWeather()
    const location = useLocation()

    // Only show on Home page
    if (location.pathname !== '/') return null

    if (loading || !weather || !weather.weather || !weather.weather[0]) return null

    const condition = weather.weather[0].main
    // Add logic for Autumn if needed, for now using standard mapping
    // We could map 'Clouds' to Autumn if we want that effect, or keep it separate.

    const RainTheme = () => (
        <div className="weather-bg rain">
            {Array.from({ length: 120 }).map((_, i) => (
                <span
                    key={i}
                    className="raindrop"
                    style={{ '--i': Math.random() }}
                />
            ))}
        </div>
    )

    const SunnyTheme = () => (
        <div className="weather-bg sunny" />
    )

    const SnowTheme = () => (
        <div className="weather-bg winter">
            {Array.from({ length: 60 }).map((_, i) => (
                <span key={i} className="snowflake" style={{ left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 5 + 5}s`, animationDelay: `${Math.random() * 5}s` }}>❄</span>
            ))}
        </div>
    )

    const AutumnTheme = () => (
        <div className="weather-bg autumn">
            {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="leaf" style={{ left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 5 + 5}s`, animationDelay: `${Math.random() * 5}s` }} />
            ))}
        </div>
    )

    const CloudsTheme = () => (
        <div className="weather-bg clouds">
            <div className="cloud-bg"></div>
        </div>
    )

    const ThunderTheme = () => (
        <div className="weather-bg rain thunder">
            <div className="flash"></div>
            {Array.from({ length: 120 }).map((_, i) => (
                <span
                    key={i}
                    className="raindrop"
                    style={{ '--i': Math.random() }}
                />
            ))}
        </div>
    )

    // Helper to determine season or special overrides could go here
    switch (condition) {
        case 'Rain':
        case 'Drizzle':
            return <RainTheme />
        case 'Thunderstorm':
            return <ThunderTheme />
        case 'Clear':
            return <SunnyTheme />
        case 'Snow':
            return <SnowTheme />
        case 'Autumn': // Explicit state for Demo
            return <AutumnTheme />
        case 'Clouds':
        case 'Mist':
        case 'Fog':
        case 'Haze':
        case 'Smoke':
            return <CloudsTheme />
        default:
            return <SunnyTheme />
    }
}

export default WeatherBackground
