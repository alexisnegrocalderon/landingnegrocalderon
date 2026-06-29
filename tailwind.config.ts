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
        dark: "#09070A",
        surface: "#110E08",
        "surface-2": "#1A1410",
        accent: "#C87C3A",
        "accent-light": "#E09050",
        cream: "#F4EEE4",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "float-cube": "float-cube 10s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        "float-cube": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2.5%)" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
