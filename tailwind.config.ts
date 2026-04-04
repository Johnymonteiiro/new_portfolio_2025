import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: "#7e5bef",
        white: "rgba(236, 236, 236, 1)",
        black: "#0f1011",
        "purple-flat": "rgba(31, 18, 46, 1)",
        "green-flat": "rgba(18, 46, 40, 1)",
        green: "rgba(2, 192, 150, 1)",
        yellow:"rgba(251, 227, 45, 1)",
        "yellow-flat":"rgba(251, 227, 45, 0.2)",
        gray: "rgba(147, 148, 150, 1)",
        "card-bg": "rgba(22, 22, 22, 1)",
        "border-color": "rgba(37, 38, 43, 1)",
      },
      fontSize: {
        xlg: "1.75rem", // 28px
        lg: "1rem", // 16px
        md: "0.875rem", // 14px
        sm: "0.75rem", // 12px
        xs: "0.6875rem", // 11px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        normal: "0px 2px 28px 0px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        multiPulse: {
          "0%": { transform: "scale(0.5)", opacity: '1' },
          "100%": { transform: "scale(1.5)", opacity: "0"},
        },
      },
      animation: {
        multiPulse: "multiPulse 1.5s infinite ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
