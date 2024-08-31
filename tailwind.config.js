/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ], theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '980px',
      xl: '1280px',
    },
    important: true,
    extend: {
      colors: {
        card: '#F2F4F7',

      },
    },
  },
  plugins: [],
}

