/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      theme: {
        fontFamily: {
          sans: ["Inter", ...defaultTheme.fontFamily.sans],
        },
      },
      screens: {
        xs: "320px",
        "3xl": "1700px",
        "4xl": "1920px",
        ...defaultTheme.screens,
      },
      colors: {
        primary: "#037362",
        hightlight: "#05ce78",
        bodyblack: "#282828",
      },
      fontSize: {
        "responsive-cover": "clamp(2.5rem, 7vw, 5rem)",
        "responsive-subCover": "clamp(1rem, 3vw, 3.5rem)",
        "responsive-2xl": "clamp(2.2rem, 3.8vw, 3rem)",
        "responsive-xl": "clamp(1.9rem, 3.5vw, 2.2rem)",
        "responsive-2lg": "clamp(1.6rem, 3vw, 1.9rem)",
        "responsive-lg": "clamp(1.5rem, 2.7vw, 1.6rem)",
        "responsive-md": "clamp(1.3rem, 2.5vw, 1.4rem)",
        "responsive-2md": "clamp(1.1rem, 2.0vw, 1.2rem)",
        "responsive-sm": "clamp(1.1rem, 1.75vw, 1.3rem)",
        "responsive-2sm": "clamp(0.95rem, 1.5vw, 1.1rem)",
        "responsive-xs": "clamp(0.9rem, 1.4vw, 1rem)",
        "responsive-2xs": "clamp(0.85rem, 1vw, 0.9rem)",
        "responsive-3xs": "clamp(0.75rem, 0.75vw, 0.8rem)",
      },
    },
  },
  plugins: [],
};
