/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-black': '#000000',
        'neo-white': '#ffffff',
        'ski-orange': '#FF4500',
        'retro-teal': '#20B2AA',
        'pine-green': '#2F4F4F',
        'granite-gray': '#696969',
        'red-rock': '#CD5C5C',
        'salt-white': '#F5F5F5',
        'snow-white': '#FFFAFA',
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        'display': ['"Courier New"', 'Courier', 'monospace'], // Placeholder for brutalist font
        'body': ['Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
