import type { Config } from "tailwindcss";

// Lets opacity modifiers (e.g. bg-surface/80) work with CSS-variable colors
const withAlpha = (variable: string) =>
  `color-mix(in srgb, var(${variable}) calc(<alpha-value> * 100%), transparent)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: withAlpha("--background"),
        surface: withAlpha("--surface"),
        border: withAlpha("--border"),
        foreground: withAlpha("--foreground"),
        muted: withAlpha("--muted"),
        accent: {
          DEFAULT: withAlpha("--accent"),
          indigo: withAlpha("--accent-indigo"),
          cyan: withAlpha("--accent-cyan"),
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-sm": "var(--shadow-glow-sm)",
      },
      fontFamily: {
        sans: [withAlpha("--font-inter"), "system-ui", "sans-serif"],
        heading: [withAlpha("--font-plus-jakarta"), "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
        "fluid-3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
        "fluid-4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
        "fluid-5xl": "clamp(3rem, 2.25rem + 3.75vw, 4rem)",
      },
    },
  },
  plugins: [],
};

export default config;
