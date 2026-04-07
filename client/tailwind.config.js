/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'labfont': ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'lab-orange': '#f97316',
        'lab-blue': '#0ea5e9',
        'lab-dark': '#0f172a',
        'lab-light': '#f8fafc',
        'theme-blue': '#f0f9ff',
        'theme-orange': '#fffaf0',
      },
    },
  },
  plugins: [],
}
