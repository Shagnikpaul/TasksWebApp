
/** @type {import('tailwindcss').Config} */

// const { heroui } = require("@heroui/react");

import { heroui } from '@heroui/react';

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

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
  plugins: [heroui(
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