"use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon, SunMoon } from "lucide-react";
type ThemeMode = "light" | "dark" | "system";

const DarkModeToggle: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode | null;

    if (savedTheme) {
      setThemeMode(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to system preference if no saved theme
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setThemeMode("system");
      applyTheme(systemPrefersDark ? "dark" : "light");
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  // Apply theme to document
  const applyTheme = (mode: ThemeMode | "light" | "dark") => {
    const isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Change theme and save to localStorage
  const changeTheme = (newMode: ThemeMode) => {
    setThemeMode(newMode);
    localStorage.setItem("themeMode", newMode);
    applyTheme(newMode);
    setIsOpen(false);
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="rounded-full bg-zinc-200 p-2 shadow-md transition-all duration-300 hover:bg-zinc-300 hover:shadow-lg dark:bg-zinc-700 dark:hover:bg-zinc-600"
        aria-expanded={isOpen}
        aria-label="Theme settings"
      >
        {themeMode === "light" && <Sun className="h-4 w-4 text-yellow-500" />}
        {themeMode === "dark" && <Moon className="h-4 w-4 text-indigo-400" />}
        {themeMode === "system" && (
          <SunMoon className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right transform rounded-lg border border-zinc-200 bg-white py-2 shadow-xl transition-transform duration-200 ease-in-out dark:border-zinc-700 dark:bg-zinc-800">
          <div className="border-b border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            Theme Settings
          </div>

          <button
            onClick={() => changeTheme("light")}
            className={`flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
              themeMode === "light"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <Sun className="mr-3 h-4 w-4 text-yellow-500" />
            Light
            {themeMode === "light" && (
              <span className="ml-auto text-indigo-600 dark:text-indigo-400">
                ✓
              </span>
            )}
          </button>

          <button
            onClick={() => changeTheme("dark")}
            className={`flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
              themeMode === "dark"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <Moon className="mr-3 h-4 w-4 text-indigo-500" />
            Dark
            {themeMode === "dark" && (
              <span className="ml-auto text-indigo-600 dark:text-indigo-400">
                ✓
              </span>
            )}
          </button>

          <button
            onClick={() => changeTheme("system")}
            className={`flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
              themeMode === "system"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <SunMoon className="mr-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            System
            {themeMode === "system" && (
              <span className="ml-auto text-indigo-600 dark:text-indigo-400">
                ✓
              </span>
            )}
          </button>
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DarkModeToggle;
