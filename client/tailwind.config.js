/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryTheme: "var(--primary-color)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}