/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      
      {
        mytheme: {
          "primary": "#202833",

          "secondary": "#c5c6c8",

          "accent": "#66fcf1",

          "neutral": "#4b5563",

          "base-100": "#0B0C10",

          "info": "#46a19f",

          "success": "#00ff00",

          "warning": "#f59e0b",

          "error": "#ff0000",

          "custom": '#1c2740',
        },
      },
    ],
  },
};
