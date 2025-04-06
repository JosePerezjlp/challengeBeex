/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./containers/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#1B1B1B",
        black1: "#070707",
        gray01: "#F8F8F8",
        gray02: "#6E6E6E",
        gray03: "#D0D5DD",
        gray10: "#6E6E6E",
        gray83: "#D0D5DD",
        green: "#87FFFF",
        green10: "#0B6E6E",
      },
    },
  },
  plugins: [],
};
