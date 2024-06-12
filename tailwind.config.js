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
        "650": "650px",
      }
    },
  },
  plugins: [],
}

