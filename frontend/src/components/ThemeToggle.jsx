import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    // Load saved theme preference on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const isDarkMode = savedTheme === 'dark';
        setIsDark(isDarkMode);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        setIsDark(newTheme === 'dark');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
        </button>
    );
};

export default ThemeToggle;
