import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F0",
        sand: "#F7F3EA",
        card: "#FFFDF8",
        ink: "#1F2420",
        muted: "#5F665F",
        forest: "#2F5B3F",
        "forest-soft": "#DDE8D8",
        line: "#DDD6C8",
        panel: "#111714",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31,36,32,0.04), 0 12px 32px -12px rgba(31,36,32,0.14)",
        lift: "0 2px 4px rgba(31,36,32,0.05), 0 20px 44px -16px rgba(31,36,32,0.22)",
        float: "0 18px 50px -18px rgba(31,36,32,0.28)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.375rem",
      },
      maxWidth: {
        content: "1360px",
      },
    },
  },
  plugins: [],
};

export default config;
