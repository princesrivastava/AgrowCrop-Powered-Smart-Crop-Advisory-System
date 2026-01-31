import React from 'react'
import './WeatherWidget.css'
import { WeatherIcon } from './WeatherIcons'
import { useWeather } from '../context/WeatherContext'

const WeatherWidget = () => {
    const { weather, loading, error, handleRefresh, startDemoMode } = useWeather()

    const getWeatherAnimation = (condition) => {
        const animationMap = {
            Clear: 'sunny',
            Clouds: 'cloudy',
            Rain: 'rainy',
            Drizzle: 'rainy',
            Thunderstorm: 'stormy',
            Snow: 'snowy',
            Mist: 'foggy',
            Smoke: 'foggy',
            Haze: 'foggy',
            Dust: 'foggy',
            Fog: 'foggy'
        }
        return animationMap[condition] || 'default'
    }

    if (loading) {
        return (
            <div className="weather-widget loading">
                <div className="weather-loader">
                    <div className="loader-spinner"></div>
                    <p>Loading weather...</p>
                </div>
            </div>
        )
    }

    if (error || !weather) {
        return (
            <div className="weather-widget error">
                <div className="weather-icon">⚠️</div>
                <p>{error || 'Weather unavailable'}</p>
                <button className="refresh-btn" onClick={handleRefresh} title="Retry">
                    🔄
                </button>
            </div>
        )
    }

    // Validate weather data exists before accessing nested properties
    const hasWeatherData = weather?.weather?.[0]
    const hasMainData = weather?.main
    const hasWindData = weather?.wind

    const weatherCondition = hasWeatherData ? weather.weather[0].main : null
    const iconCode = hasWeatherData ? weather.weather[0].icon : null
    const weatherAnimation = weatherCondition ? getWeatherAnimation(weatherCondition) : 'default'

    return (
        <div className={`weather-widget ${weatherAnimation}`}>
            <div className="weather-header">
                {weather.name && (
                    <>
                        <span className="location-icon">📍</span>
                        <span className="location-name">{weather.name}</span>
                    </>
                )}
            </div>

            {hasWeatherData && hasMainData && (
                <div className="weather-main">
                    <div className={`weather-icon-animated ${weatherAnimation}`}>
                        {iconCode ? (
                            <WeatherIcon code={iconCode} size={100} className="weather-svg" />
                        ) : (
                            <span style={{ fontSize: '40px' }}>🌤️</span>
                        )}
                    </div>
                    <div className="weather-temp">
                        <span className="temp-value">{Math.round(weather.main.temp)}</span>
                        <span className="temp-unit">°C</span>
                    </div>
                </div>
            )}

            {hasWeatherData && weather.weather[0].description && (
                <div className="weather-description">
                    {weather.weather[0].description}
                </div>
            )}

            {(hasMainData || hasWindData) && (
                <div className="weather-details">
                    {hasMainData && weather.main.humidity !== undefined && (
                        <div className="detail-item">
                            <span className="detail-icon">💧</span>
                            <span className="detail-label">Humidity</span>
                            <span className="detail-value">{weather.main.humidity}%</span>
                        </div>
                    )}
                    {hasWindData && weather.wind.speed !== undefined && (
                        <div className="detail-item">
                            <span className="detail-icon">💨</span>
                            <span className="detail-label">Wind</span>
                            <span className="detail-value">{Math.round(weather.wind.speed * 3.6)} km/h</span>
                        </div>
                    )}
                </div>
            )}

            <div className="weather-footer">
                <button className="refresh-btn" onClick={handleRefresh} title="Refresh weather">
                    🔄
                </button>

            </div>
        </div>
    )
}

export default WeatherWidget
