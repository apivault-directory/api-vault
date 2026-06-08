import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { 0: "#0A0B0D", 1: "#111316", 2: "#181B20", 3: "#22262D" },
        line: { DEFAULT: "#262A31", 2: "#353B44" },
        fg: { 0: "#F5F6F7", 1: "#B4B8C0", 2: "#7A8089", 3: "#4A5058" },
        accent: { DEFAULT: "#00FF88", dim: "#00CC6E", glow: "rgba(0, 255, 136, 0.15)" },
        status: { ok: "#00FF88", warn: "#FFB020", err: "#FF4D4D", info: "#4D9FFF" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        blink: "blink 1.1s steps(2) infinite",
        "pulse-slow": "pulse 2.4s ease-in-out infinite",
        "scroll-x": "scroll 45s linear infinite",
        breathe: "breathe 12s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        breathe: {
          "0%, 100%": { opacity: "0.55", transform: "translateX(-50%) scale(1)" },
          "50%": { opacity: "0.85", transform: "translateX(-50%) scale(1.06)" },
        },
        scroll: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      backgroundImage: { "gradient-radial": "radial-gradient(var(--tw-gradient-stops))" },
    },
  },
  plugins: [],
};

export default config;
