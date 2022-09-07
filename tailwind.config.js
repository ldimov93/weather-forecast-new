/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '768px',
      lg: '1200px',
      xl: '1536px',
    },    
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
  colors: {
    gray: colors.gray,
    blue: colors.sky,
    red: colors.rose,
    pink: colors.fuchsia,
  },  
  darkMode: 'media',  
}
