
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue": "#507DBC",
        "pink": "#B86177",
        "dark-pink": "#975162",
        "black-25": "#00000040",
        "light-gray": "#d4d4d5"
      },
      spacing: {
        "1350": "1350px",
        "800": "800px",
        "650": "650px",
        "400": "400px",
        "500": "500px"
      },
      keyframes: {
        pulsing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        }
      },
      animation: {
        pulsing: 'pulsing 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

