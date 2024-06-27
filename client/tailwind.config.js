
/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");


export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',

  ],
  theme: {
    colors: {
      'olive': {
        light: '#1E1E1E',
        DEFAULT: '#1E1E1E',
        dark: '#1E1E1E',
        text: '#E0FFFD'
      }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sourcecode: ["Source Code Pro", "monospace"],
      inter: ["Inter", "sans-serif"]
    },
    extend: {},

  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#1E1E1E",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
}