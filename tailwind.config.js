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
        "black-25": "#00000040"
      },
      spacing: {
        "1200": "1200px",
        "650": "650px",
      }
    },
  },
  plugins: [],
}

