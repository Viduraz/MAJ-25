/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Add your custom colors here if needed
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none", // For Internet Explorer and Edge
          "scrollbar-width": "none", // For Firefox
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", // For Chrome, Safari, and Opera
        },
      });
    },
  ],
  "css.validate": false,
  "tailwindCSS.includeLanguages": {
    "plaintext": "html"
  }
};
