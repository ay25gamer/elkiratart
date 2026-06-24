import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette galerie d'art contemporaine — sobre et élégante
        canvas: "#faf9f6", // blanc cassé / fond
        ink: "#1a1a1a", // noir doux pour le texte
        stone: {
          50: "#f7f6f3",
          100: "#eceae4",
          200: "#d8d4ca",
          300: "#bdb6a7",
          400: "#9c9382",
          500: "#7e7565",
          600: "#645d50",
          700: "#4f4940",
          800: "#3b3731",
          900: "#2a2622",
        },
        gold: "#b08d57", // accent doré discret
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out forwards",
        "fade-in-slow": "fade-in-slow 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
