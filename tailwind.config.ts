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
        /*
         * Form field borders only. `line` is 1.35:1 against the page, which is
         * fine for a decorative rule but fails SC 1.4.11 when the border is the
         * only thing identifying an input's boundary. This clears 3:1 against
         * card, ivory, and the modal's field fill.
         */
        field: "#8A8375",
        panel: "#111714",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Didot", "Bodoni MT", "serif"],
        "source-serif-display": [
          "var(--font-source-serif-display)",
          "Georgia",
          "serif",
        ],
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
