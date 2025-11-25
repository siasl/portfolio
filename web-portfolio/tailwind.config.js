/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tahoe-blue': '#1a3c5e', // Deep lake blue
        'tahoe-teal': '#2c7873', // Vibrant teal
        'tahoe-granite': '#4a4a4a', // Dark rock gray
        'tahoe-snow': '#f8f9fa', // Bright white
        'tahoe-dark': '#1d1d1f', // macOS dark gray
        'glass-white': 'rgba(255, 255, 255, 0.2)',
        'glass-border': 'rgba(255, 255, 255, 0.3)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'dock': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'window': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
        'segoe': ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        'comic': ['"Comic Sans MS"', '"Chalkboard SE"', '"Comic Neue"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
