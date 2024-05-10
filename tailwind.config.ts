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
        "lake-blue": "#85A0BB",
        "green-grey": "#9DB5B2",
        "calm-grey": "#D3D5D4",
        "calm-green": "#D2DDDC",
        "calm-violet": "#A093AB",
        "light-grey": "#c3c6c9",
        "slate-grey": "#7B818B",
        "medium-grey": "#60656D",
        "dark-grey": "#4A4E54",
        "dark-violet": "#715E82",
      },
    },
  },
  plugins: [],
};
export default config;
