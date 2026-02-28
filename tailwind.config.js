export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        accent: "#22D3EE",
        background: "#020617",
        surface: "#0F172A",
        card: "#111827",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.35)",
      },
    },
  },
  plugins: [],
};
