/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#1a1a1a',
          accent: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}
