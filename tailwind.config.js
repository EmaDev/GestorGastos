/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        hover: "var(--color-hover)",
        textPrimary: "var(--color-text)",
        textSecondary: "var(--color-text-secondary)",
        btnPrimary: "var( --color-btn-primary)",
        btnSecondary: "var( --color-btn-secondary)",
        succes: "var(--color-success))",
        info: "var(--color-info)",
        warn: "var(--color-warn)",
        error: "var(--color-error)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

