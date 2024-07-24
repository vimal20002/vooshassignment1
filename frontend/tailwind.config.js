/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // Adjust the paths according to your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          DEFAULT: '#1d4ed8',
          dark: '#1e3a8a',
        },
        secondary: {
          light: '#fca5a5',
          DEFAULT: '#f87171',
          dark: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
