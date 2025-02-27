import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'vintage-blue': '#A8D0E6',
        'pale-pink': '#F8C7CC',
        'soft-pink': '#F3A4B5',
        'soft-blue': '#B8E0D2',
      },
      fontFamily: {
        custom: ['BILLO', 'sans-serif'], // Añade tu fuente personalizada
      },
    },
  },
  plugins: [],
} satisfies Config;