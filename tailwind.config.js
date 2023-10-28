/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#2B2C40",
      },
      colors: {
        orange: "#FFAB00",
      },
    },
  },
  plugins: [],
};
