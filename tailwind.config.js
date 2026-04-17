export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        primary: "var(--primary)",
        destructive: "var(--destructive)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};