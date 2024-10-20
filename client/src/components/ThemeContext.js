import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark'); // Add 'dark' class
        } else {
            document.documentElement.classList.remove('dark'); // Remove 'dark' class
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
