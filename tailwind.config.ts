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
        "bv-white": "#FEFEFE",
        "bv-black": "#0A0A0A",
        timberwolf: "#D3D5D4",
        "lake-blue": "#6688AA",
        "green-grey": "#9DB5B2",
        "slate-grey": "#878E99",
        "dark-violet": "#715E82",
      },
    },
  },
  plugins: [],
};
export default config;
