const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    transitionProperty: {
      height: "height",
    },
    colors: {
      ...colors,
      primary: "#009999",
    },
  },
  variants: {
    extend: {
      boxShadow: ["active"],
    },
  },
  plugins: [],
}
