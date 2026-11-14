/** Theme colours come from CSS variables (see src/themes.js), so every
 *  Tailwind class such as bg-maroondark or text-gold/60 follows the theme. */
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: c("ivory"),
        champagne: c("champagne"),
        maroon: c("maroon"),
        maroondark: c("maroondark"),
        gold: c("gold"),
        golddeep: c("golddeep"),
        cocoa: { DEFAULT: c("cocoa"), soft: c("cocoa-soft") },
      },
      fontFamily: {
        body: ["Outfit", "Segoe UI", "sans-serif"],
        devanagari: ["Tiro Devanagari Sanskrit", "serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Great Vibes", "cursive"],
      },
      boxShadow: {
        "gold-soft": "0 24px 60px -28px rgb(var(--c-maroondark) / 0.35)",
        "glow-gold": "0 0 0 6px rgb(var(--c-gold) / 0.14)",
      },
      keyframes: {
        "float-soft": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "pulse-soft": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.22)" },
        },
        "spin-slow": { to: { transform: "rotate(1turn)" } },
      },
      animation: {
        "float-soft": "float-soft 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};
