/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
      background: "#0B0F14",
      surface: "#151D2A",
      accent: "#00D9FF",

      success: "#22C55E",
      danger: "#EF4444",
      warning: "#F59E0B",

      primaryText: "#F8FAFC",
      secondaryText: "#94A3B8",
    }
    },
  },
  plugins: [],
};