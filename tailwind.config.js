/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main":"#FF4F4F"
      }
    },
  },
  plugins: [require("daisyui")],
  darkMode:'class'
}

