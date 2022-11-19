/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        permanent: ["Permanent_Marker"],
      },
    },
    colors: {
      transparent:"transparent",
      primary: "#b8dcdd",
      primary_accent:"#6E8485",
      light: "#ecf3f3",
      dark: "#343a3a",
      accent: "#c75313",
      highlight: "#94f7b2",
      grey: "#8C8F96",
      red: "#AB1729",
      green: "#29AB17",
      blue: "#1873AB",
      yellow: "#AB9917",
      purple: "#9917AB",
      orange:"#AB5017",
    },
  },
  plugins: [],
};
