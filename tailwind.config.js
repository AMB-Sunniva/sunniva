/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-blue": "#253760",
        "custom-gray": "#474949",
        "custom-tan": "#E2D9D2",
        "custom-light-gray": "#F0F0F0",
        "bg-gray": "rgba(51, 51, 51, 0.7)",
      },
      letterSpacing: {
        '2px': '2px',
      },
      width: {
        '600px': '600px',
        '38rem': '38rem'
      },
      height: {
        '600px': '600px',
      },
    },
  },
  plugins: [],
};
