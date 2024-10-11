/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          "background-latar": "url('./assets/background-latar.jpg')",
        },
        fontFamily: {
          Protest_Revolution: ["Protest Revolution", "sans-serif"],
          Protest_Riot: ["Protest Riot", "sans-serif"],
          Montserrat: ["Montserrat", "sans-serif"],
        },
        content: {
          profile: "url('./assets/profile.jpg')",
        },
      },
      variants: {
        extend: {},
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
      },
    },
    plugins: [],
  };
  