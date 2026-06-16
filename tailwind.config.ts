import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem"
      },
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        background: "#0B0F19",
        primary: "#00D4FF",
        secondary: "#7B61FF",
        accent: "#4F46E5",
        text: "#F8FAFC",
        muted: "#94A3B8",
        border: "rgba(148, 163, 184, 0.2)"
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      borderRadius: {
        card: "20px",
        input: "16px",
        button: "999px"
      },
      boxShadow: {
        glow: "0 0 60px rgba(0, 212, 255, 0.2)",
        purple: "0 0 70px rgba(123, 97, 255, 0.24)",
        card: "0 24px 70px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #00D4FF 0%, #4F46E5 48%, #A855F7 100%)",
        "soft-grid":
          "linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: [animate]
};

export default config;
