
/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");


export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',

  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sourcecode: ["Source Code Pro", "monospace"],
    },
    extend: {},

  },
  darkMode: "class",
  plugins: [nextui()]
}