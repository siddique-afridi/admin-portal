// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

 // Load theme from localStorage on first render
 useEffect(() => {
    // console.log("ThemeContext: Initializing theme");
    try {
      const savedTheme = localStorage.getItem("theme");
      // console.log("ThemeContext: Saved theme from localStorage:", savedTheme);
      if (savedTheme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
        // console.log("ThemeContext: Applied dark mode");
      } else if (savedTheme === "light") {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
        // console.log("ThemeContext: Applied light mode");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
        // console.log("ThemeContext: Applied system preference, darkMode:", prefersDark);
      }
    } catch (error) {
      console.warn("ThemeContext: Error accessing localStorage:", error);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
      // console.log("ThemeContext: Fallback to system preference, darkMode:", prefersDark);
    }
  }, []);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
        // console.log("ThemeContext: System preference changed, darkMode:", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    // console.log("ThemeContext: Toggled to", newMode ? "dark" : "light", "mode");
    try {
      localStorage.setItem("theme", newMode ? "dark" : "light");
    } catch (error) {
      // console.warn("ThemeContext: Error saving theme to localStorage:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};