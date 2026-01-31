import React, { createContext, useState, useContext, useEffect } from 'react'

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [isWeatherVisible, setIsWeatherVisible] = useState(true)
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // OpenWeatherMap API key
    const API_KEY = '335c62961af297f85e7d2a461f8edd62'

    const toggleWeather = () => {
        setIsWeatherVisible(prev => !prev)
    }

    const fetchWeather = async (lat, lon) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            console.log('Fetching weather from:', url.replace(API_KEY, 'API_KEY_HIDDEN'))

            const response = await fetch(url)

            if (!response.ok) {
                // If 401 (Invalid API key), use mock data as fallback
                if (response.status === 401) {
                    console.warn('⚠️ API key invalid or not activated. Using mock weather data.')
                    useMockWeatherData()
                    return
                }
                throw new Error(`Weather API error: ${response.status}`)
            }

            const data = await response.json()
            setWeather(data)
            setLoading(false)
        } catch (err) {
            console.error('Weather fetch error:', err)
            useMockWeatherData()
        }
    }

    const useMockWeatherData = () => {
        console.log('📊 Using mock weather data (Demo Mode)')
        const mockData = {
            name: 'Delhi',
            weather: [{
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }],
            main: {
                temp: 28,
                humidity: 45
            },
            wind: {
                speed: 3.5
            }
        }
        setWeather(mockData)
        setError(null)
        setLoading(false)
    }

    const startDemoMode = () => {
        console.log('🎬 Starting Demo Mode...')
        setLoading(false)

        const themes = [
            { main: 'Thunderstorm', description: 'Thunderstorm', icon: '11d', temp: 19 },
            { main: 'Rain', description: 'Heavy Rain', icon: '09d', temp: 22 },
            { main: 'Autumn', description: 'Windy Autumn', icon: '50d', temp: 24 },
            { main: 'Clear', description: 'Sunny Day', icon: '01d', temp: 32 },
            { main: 'Snow', description: 'Snowfall', icon: '13d', temp: -2 },
            { main: 'Clouds', description: 'Cloudy', icon: '03d', temp: 18 }
        ]

        let index = 0

        // Immediate first theme
        setWeather({
            name: 'Demo Mode',
            weather: [{ main: themes[0].main, description: themes[0].description, icon: themes[0].icon }],
            main: { temp: themes[0].temp, humidity: 60 },
            wind: { speed: 5 }
        })

        const interval = setInterval(() => {
            index = (index + 1) % themes.length
            const theme = themes[index]
            setWeather({
                name: 'Demo Mode',
                weather: [{ main: theme.main, description: theme.description, icon: theme.icon }],
                main: { temp: theme.temp, humidity: 60 },
                wind: { speed: 5 }
            })
        }, 5000) // Change every 5 seconds

        // Stop after 60 seconds
        setTimeout(() => {
            clearInterval(interval)
            console.log('🏁 Demo Mode Ended. Reverting to real weather.')
            handleRefresh()
        }, 60000)
    }

    const handleRefresh = () => {
        setLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude)
                },
                (err) => {
                    console.error('Geolocation error:', err)
                    setError('Location permission denied.')
                    useMockWeatherData()
                }
            )
        } else {
            setError('Geolocation not supported')
            useMockWeatherData()
        }
    }

    // Initial fetch
    useEffect(() => {
        handleRefresh()
    }, [])

    return (
        <WeatherContext.Provider value={{
            isWeatherVisible,
            toggleWeather,
            weather,
            loading,
            error,
            handleRefresh,
            startDemoMode
        }}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => {
    const context = useContext(WeatherContext)
    if (!context) {
        throw new Error('useWeather must be used within WeatherProvider')
    }
    return context
}
