/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC301",
        secondary: "#7CC84E",
        base: "#4E4E4E",
        dashboard: "#023f86",
        gtdandy: "#FFC301",
      },
    },
  },
  plugins: [],
};
