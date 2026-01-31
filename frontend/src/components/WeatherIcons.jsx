import React from 'react';

export const WeatherIcon = ({ code, className = "", size = 48 }) => {
    // Map OpenWeatherMap icon codes to SVG paths
    const getIconContent = (code) => {
        // Clear Sky (Day)
        if (code === '01d') {
            return (
                <g>
                    <circle cx="24" cy="24" r="10" fill="currentColor" className="text-yellow-400" />
                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="24" y1="6" x2="24" y2="2" />
                        <line x1="24" y1="42" x2="24" y2="46" />
                        <line x1="42" y1="24" x2="46" y2="24" />
                        <line x1="2" y1="24" x2="6" y2="24" />
                        <line x1="36.73" y1="36.73" x2="39.56" y2="39.56" />
                        <line x1="8.44" y1="8.44" x2="11.27" y2="11.27" />
                        <line x1="36.73" y1="11.27" x2="39.56" y2="8.44" />
                        <line x1="8.44" y1="39.56" x2="11.27" y2="36.73" />
                    </g>
                </g>
            );
        }
        // Clear Sky (Night)
        if (code === '01n') {
            return (
                <path
                    d="M33.2 29.8C33.2 36.3 27.9 41.6 21.4 41.6C16.8 41.6 12.8 38.8 11 34.8C10.7 35 10.3 35.1 10 35.1C7.8 35.1 6 33.3 6 31.1C6 29 7.7 27.2 9.8 27.1C10.4 22.3 14.5 18.6 19.4 18.6C20.1 18.6 20.8 18.7 21.4 18.8C22.2 13.9 26.4 10.2 31.4 10.2C32.1 10.2 32.8 10.3 33.5 10.4C32.1 12.6 31.3 15.2 31.3 18C31.3 22.9 33.7 27.2 37.4 29.9C36.1 29.8 34.7 29.8 33.2 29.8Z"
                    fill="currentColor"
                    className="text-gray-300"
                />
            );
        }
        // Clouds (Few/Scattered/Broken/Overcast)
        if (['02d', '02n', '03d', '03n', '04d', '04n'].includes(code)) {
            return (
                <g>
                    {code.includes('d') && (
                        <circle cx="16" cy="16" r="6" fill="#FBBF24" />
                    )}
                    <path
                        d="M36 36H16C11.58 36 8 32.42 8 28C8 23.58 11.58 20 16 20C16.82 20 17.61 20.12 18.36 20.35C19.72 15.86 23.9 12.5 28.8 12.5C34.76 12.5 39.6 17.34 39.6 23.3C39.6 23.6 39.59 23.9 39.56 24.19C39.7 24.18 39.85 24.18 40 24.18C42.21 24.18 44 25.97 44 28.18C44 30.39 42.21 32.18 40 32.18H36V36Z"
                        fill="currentColor"
                        className="text-gray-200"
                    />
                </g>
            );
        }
        // Rain (Shower/Rain)
        if (['09d', '09n', '10d', '10n'].includes(code)) {
            return (
                <g>
                    <path
                        d="M36 26H16C11.58 26 8 22.42 8 18C8 13.58 11.58 10 16 10C16.82 10 17.61 10.12 18.36 10.35C19.72 5.86 23.9 2.5 28.8 2.5C34.76 2.5 39.6 7.34 39.6 13.3C39.6 13.6 39.59 13.9 39.56 14.19C39.7 14.18 39.85 14.18 40 14.18C42.21 14.18 44 15.97 44 18.18C44 20.39 42.21 22.18 40 22.18H36V26Z"
                        fill="currentColor"
                        className="text-gray-300"
                    />
                    <g stroke="#60A5FA" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="30" x2="16" y2="36" />
                        <line x1="26" y1="30" x2="24" y2="36" />
                        <line x1="34" y1="30" x2="32" y2="36" />
                    </g>
                </g>
            );
        }
        // Thunderstorm
        if (['11d', '11n'].includes(code)) {
            return (
                <g>
                    <path
                        d="M36 26H16C11.58 26 8 22.42 8 18C8 13.58 11.58 10 16 10C16.82 10 17.61 10.12 18.36 10.35C19.72 5.86 23.9 2.5 28.8 2.5C34.76 2.5 39.6 7.34 39.6 13.3C39.6 13.6 39.59 13.9 39.56 14.19C39.7 14.18 39.85 14.18 40 14.18C42.21 14.18 44 15.97 44 18.18C44 20.39 42.21 22.18 40 22.18H36V26Z"
                        fill="currentColor"
                        className="text-gray-400"
                    />
                    <path
                        d="M26 26L22 34H28L24 44L34 32H28L32 26H26Z"
                        fill="#FBBF24"
                        stroke="#F59E0B"
                        strokeWidth="1"
                        strokeLinejoin="round"
                    />
                </g>
            );
        }
        // Snow
        if (['13d', '13n'].includes(code)) {
            return (
                <g>
                    <circle cx="24" cy="24" r="18" fill="#E5E7EB" opacity="0.5" />
                    <g stroke="#93C5FD" strokeWidth="2" strokeLinecap="round">
                        <line x1="24" y1="14" x2="24" y2="34" />
                        <line x1="15.34" y1="19" x2="32.66" y2="29" />
                        <line x1="15.34" y1="29" x2="32.66" y2="19" />
                    </g>
                </g>
            )
        }
        // Mist/Fog
        if (['50d', '50n'].includes(code)) {
            return (
                <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-gray-300">
                    <line x1="10" y1="16" x2="38" y2="16" />
                    <line x1="14" y1="24" x2="34" y2="24" />
                    <line x1="10" y1="32" x2="38" y2="32" />
                </g>
            )
        }

        // Default (Fall back to Sun)
        return (
            <circle cx="24" cy="24" r="10" fill="#FBBF24" />
        );
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {getIconContent(code)}
        </svg>
    );
};

export const NavbarWeatherIcon = ({ size = 28, className = "" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
            <circle cx="12" cy="12" r="4" fill="#FBBF24" fillOpacity="0.4" />
        </svg>
    )
}

export const WeatherStatusIcon = ({
    type = "sunny", // sunny | rain | cloud | winter | autumn
    size = 28
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* ☀️ SUNNY */}
            {type === "sunny" && (
                <>
                    <circle cx="32" cy="32" r="10" fill="#FDB813" />
                    <g stroke="#FDB813" strokeWidth="2" strokeLinecap="round">
                        <line x1="32" y1="6" x2="32" y2="14" />
                        <line x1="32" y1="50" x2="32" y2="58" />
                        <line x1="6" y1="32" x2="14" y2="32" />
                        <line x1="50" y1="32" x2="58" y2="32" />
                        <line x1="14" y1="14" x2="20" y2="20" />
                        <line x1="44" y1="44" x2="50" y2="50" />
                        <line x1="14" y1="50" x2="20" y2="44" />
                        <line x1="44" y1="20" x2="50" y2="14" />
                    </g>
                </>
            )}

            {/* ☁️ CLOUDY */}
            {type === "cloud" && (
                <path
                    d="M42 40H20C16 40 13 37 13 33
             C13 29.5 15.5 26.5 19 26
             C20.5 22 24 19 28 19
             C33 19 37 23 37.5 28
             C41 28.5 44 31.5 44 35
             C44 38 43 40 42 40Z"
                    fill="#E5E7EB"
                />
            )}

            {/* 🌧️ RAIN */}
            {type === "rain" && (
                <>
                    <path
                        d="M42 34H20C16 34 13 31 13 27
               C13 23.5 15.5 20.5 19 20
               C20.5 16 24 13 28 13
               C33 13 37 17 37.5 22
               C41 22.5 44 25.5 44 29
               C44 32 43 34 42 34Z"
                        fill="#CBD5E1"
                    />
                    <g fill="#60A5FA">
                        <circle cx="24" cy="42" r="2" />
                        <circle cx="32" cy="45" r="2" />
                        <circle cx="40" cy="42" r="2" />
                    </g>
                </>
            )}

            {/* ❄️ WINTER */}
            {type === "winter" && (
                <text x="18" y="40" fontSize="24">❄</text>
            )}

            {/* 🍂 AUTUMN */}
            {type === "autumn" && (
                <path
                    d="M32 18 C38 22, 42 28, 32 44
             C22 28, 26 22, 32 18Z"
                    fill="#D97706"
                />
            )}
        </svg>
    );
};

