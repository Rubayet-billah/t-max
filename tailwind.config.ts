import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
          DEFAULT: "#15803d",
          hover: "#166534",
          light: "#f0fdf4",
          dark: "#14532d",
        },
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          DEFAULT: "#059669",
          hover: "#047857",
          light: "#ecfdf5",
        },
        accent: {
          50: "#fff7ed",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          DEFAULT: "#ea580c",
          hover: "#c2410c",
          light: "#fff7ed",
        },
      },
    },
  },
};

export default config;
