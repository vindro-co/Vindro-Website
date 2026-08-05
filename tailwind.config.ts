import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Below this the logo + 5 links + both CTAs don't fit on one line and
        // the row overflows, so the nav collapses to the hamburger instead.
        nav: "1060px",
      },
      colors: {
        bg: {
          DEFAULT: "#fdfcfc",
          alt: "#f4f4f5",
          soft: "#fafafa",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#52525b",
          faint: "#a1a1aa",
          hover: "#27272a",
        },
        line: "#e4e4e7",
        green: "#16a34a",
        /**
         * Matches the voice widget's own avatar orb so the demo section reads as
         * one object. `DEFAULT` is the widget's stock orb colour
         * (avatar-orb-color-1) and `soft` is its second stop (avatar-orb-color-2);
         * keep these in sync with VoiceWidget.tsx.
         */
        orb: {
          DEFAULT: "#2792dc",
          hover: "#1f7cbd",
          soft: "#9ce6e6",
          tint: "#eaf4fb",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["var(--font-inter-tight)", "var(--font-inter)", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,10,10,.04), 0 8px 28px -10px rgba(10,10,10,.08)",
        lg2: "0 1px 3px rgba(10,10,10,.05), 0 20px 50px -18px rgba(10,10,10,.14)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(10,10,10,.25)" },
          "50%": { boxShadow: "0 0 0 6px rgba(10,10,10,0)" },
        },
        orbTalk: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.055)" },
        },
      },
      animation: {
        "float-1": "float 7s ease-in-out infinite",
        "float-2": "float 8s ease-in-out 1s infinite",
        "float-3": "float 6.5s ease-in-out .5s infinite",
        "pulse-ring": "pulseRing 2s infinite",
        "orb-talk": "orbTalk 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
