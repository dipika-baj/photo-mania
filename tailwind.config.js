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
        "black-25": "#00000040"
      },
      spacing: {
        "800": "800px",
        "1200": "1200px"
      }
    },
  },
  plugins: [],
}

