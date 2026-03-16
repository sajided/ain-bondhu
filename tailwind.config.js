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
        textPrimary: '#2C2C2C', // Almost black
        chatBg: '#ECE5DD', // WhatsApp chat background
        bubbleUser: '#D1F4D9', // User message bubble
        bubbleBot: '#FFFFFF', // Bot message bubble
      },
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'Kalpurush', 'Solaiman Lipi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

