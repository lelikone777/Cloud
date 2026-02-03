import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0c0f14",
          900: "#141923",
          850: "#1c2230",
          800: "#232a39",
          700: "#2d3647",
        },
        accent: {
          500: "#34d399",
          600: "#16a34a",
        },
      },
      boxShadow: {
        card: "0 12px 24px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
