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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'nesthub':'1024px',
        'nesthubmax':'1280px',
        // 'nh': {'min': '1000px', 'max': '1279px'},
        // 'nhm':{'min': '1280px'},
      },
    },
  },
  plugins: [],
};
export default config;