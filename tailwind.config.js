/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#F9004D',
          light: '#FF4D8A',
        },
        secondary: '#1D1D1D',
      }
    },
  },
  plugins: [],
}
