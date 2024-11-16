/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark-blue': '#050C9C',
      'white' : '#FFFFFF',
      'light-gray' : '#F5F5F5',
      'blue' : '#3572EF',
      'light-blue' : '#A7E6FF',
      'red' : '#ff0000',
    }
  },
  plugins: [],
}

