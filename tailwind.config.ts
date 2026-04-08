import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          500: "var(--green-500)",
          700: "var(--green-700)",
          900: "var(--green-900)",
        },
        amber: {
          100: "var(--amber-100)",
          700: "var(--amber-700)",
        },
        neutral: {
          50: "var(--neutral-50)",
          200: "var(--neutral-200)",
          600: "var(--neutral-600)",
          900: "var(--neutral-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
