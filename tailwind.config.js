/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./lib/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a1633",
          900: "#0d1b3f",
          800: "#122252",
          700: "#182b66",
        },
        brand: {
          blue: "#1a3fd6",
          orange: "#f97316",
        },
        seller: {
          navy: "#000B33",
          ink: "#0A1C47",
          muted: "#8B93A7",
          canvas: "#F5F7FA",
          orange: "#F58220",
          active: "#1E2B5A",
        },
        admin: {
          navy: "#0A1931",
          accent: "#B45309",
          canvas: "#F8F9FB",
          ink: "#0A1C47",
          muted: "#8B93A7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(15, 23, 60, 0.06)",
        cardHover: "0 8px 24px rgba(15, 23, 60, 0.12)",
      },
    },
  },
  plugins: [],
};
