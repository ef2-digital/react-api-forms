const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|input|checkbox|spinner|radio).js",
  ],

  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
