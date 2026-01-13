import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["MinhaFonte", "system-ui", "sans-serif"], // corpo
        display: ["MinhaFonte", "system-ui", "sans-serif"], // títulos
      },
    },
  },
  plugins: [],
};

export default config;
