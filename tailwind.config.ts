import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1440px",
        laptop: "1024px",
        tablet: "744px",
        mobile: "360px",
      },
      animation: {
        'expand-circle': 'expand-circle 1.5s ease-out infinite',
      },
      keyframes: {
        'expand-circle': {
          '0%': { transform: 'scale(0.5)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },

  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
