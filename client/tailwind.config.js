
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
        light: '#272B27',
        DEFAULT: '#272B27',
        dark: '#272B27',
        text: '#E3FFDE'
      }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sourcecode: ["Source Code Pro", "monospace"],
      inter: ["Inter", "sans-serif"]
    },
    extend: {},

  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  darkMode: "class",
  plugins: [nextui(
    {
      addCommonColors: true,
      // themes: {
      //   dark: {
      //     colors: {
      //       primary: {
      //         DEFAULT: "#BEF264",
      //         foreground: "#000000",
      //       },
      //       focus: "#BEF264",
      //     },
      //   },
      // }
    })],
}