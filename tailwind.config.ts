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
        "text-main": "var(--color-text-main)",
        "text-sub": "var(--color-text-sub)",
        "text-soft": "var(--color-text-soft)",
        "text-muted": "var(--color-text-muted)",
        "text-invert": "var(--text-invert)",
        "background-main": "var(--background-main)",
        "background-soft": "var(--background-soft)",
        "background-invert": "var(--background-invert)",
        "border-surface": "var(--border-surface)",
        "border-soft": "var(--border-soft)",
        "border-sub": "var(--border-sub)",
        brand: "var(--color-brand)",
      },
      boxShadow: {
        "button-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        "drop-md": "0 4px 12px 0 rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
