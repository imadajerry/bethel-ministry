import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        brand: {
          navy: "#0d1b2a",
          dark: "#141d26",
          gold: "#D4AF37",
          goldLight: "#F3E5AB",
          goldDark: "#B8860B",
          midnight: "#1D1F31",
          surface: "#19222d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
