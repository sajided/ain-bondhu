/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D5F3F', // Deep green
        secondary: '#4A9D6F', // Lighter green
        urgent: '#D32F2F', // Red
        warning: '#F57C00', // Orange
        userMsg: '#DCF8C6', // Light green
        botMsg: '#FFFFFF', // White
        bg: '#F5F5F5', // Light grey
        textPrimary: '#2C2C2C', // Almost black
        textSecondary: '#666666', // Grey
        success: '#388E3C', // Green
      },
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'Kalpurush', 'Solaiman Lipi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

