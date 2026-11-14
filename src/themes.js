/* Colour themes for the theme picker (bottom-right button).
   Each value is a hex colour; they are applied as CSS variables on <html>.
   Token names keep the original design's names: "maroon" is the primary
   colour and "gold" is the accent, whatever the actual hue. */

export const THEMES = [
  {
    // Maroon & gold base, with each section in its own colours
    // (Kirtan red & gold, Haldi yellow & orange, Mehandi green & gold,
    //  Shadi maroon & gold, RSVP purple & gold) — see .pal-* in index.css
    id: "celebration",
    name: "Reception Celebration",
    swatch: "conic-gradient(#B91C1C 0 20%, #EA580C 0 40%, #3F7D20 0 60%, #800000 0 80%, #7E22CE 0)",
    colors: {
      ivory: "#FDFBF7", champagne: "#F5EEDB", maroon: "#800000", maroondark: "#4A0404",
      gold: "#D4AF37", golddeep: "#B8860B", cocoa: "#2C1A1A", "cocoa-soft": "#4A3B3B",
      petal: "#C89A55", marigold: "#E0902F",
    },
  },
  {
    id: "royal-maroon",
    name: "Royal Maroon",
    colors: {
      ivory: "#FDFBF7", champagne: "#F5EEDB", maroon: "#800000", maroondark: "#4A0404",
      gold: "#D4AF37", golddeep: "#B8860B", cocoa: "#2C1A1A", "cocoa-soft": "#4A3B3B",
      petal: "#C89A55", marigold: "#E0902F",
    },
  },
  {
    id: "emerald-palace",
    name: "Emerald Palace",
    colors: {
      ivory: "#FBFCF8", champagne: "#ECF1E6", maroon: "#0F5A3A", maroondark: "#073322",
      gold: "#D4AF37", golddeep: "#A8841A", cocoa: "#142A20", "cocoa-soft": "#3B4A42",
      petal: "#C9A95B", marigold: "#E7B23A",
    },
  },
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    colors: {
      ivory: "#FAFBFD", champagne: "#ECEFF6", maroon: "#1F3C88", maroondark: "#0E1B42",
      gold: "#D4AF37", golddeep: "#A9851C", cocoa: "#151C2E", "cocoa-soft": "#3C4458",
      petal: "#C7A75A", marigold: "#E3B341",
    },
  },
  {
    id: "rose-blush",
    name: "Rose Blush",
    colors: {
      ivory: "#FFF9FA", champagne: "#FBEAEE", maroon: "#B0305E", maroondark: "#6B1837",
      gold: "#D9A86C", golddeep: "#A9773F", cocoa: "#3A1E28", "cocoa-soft": "#5C3C47",
      petal: "#E3A1B5", marigold: "#F0B37E",
    },
  },
  {
    id: "royal-amethyst",
    name: "Royal Amethyst",
    colors: {
      ivory: "#FCFAFD", champagne: "#F1EAF6", maroon: "#6B2A8C", maroondark: "#3A1150",
      gold: "#D4AF37", golddeep: "#A8862A", cocoa: "#261A2E", "cocoa-soft": "#4A3C52",
      petal: "#B99AD0", marigold: "#E0B04A",
    },
  },
  {
    id: "haldi-marigold",
    name: "Haldi Marigold",
    colors: {
      ivory: "#FFFBF3", champagne: "#FCEFD2", maroon: "#C2410C", maroondark: "#7A2810",
      gold: "#E6A923", golddeep: "#B7791F", cocoa: "#3B2412", "cocoa-soft": "#5E4532",
      petal: "#F2B33D", marigold: "#E8762B",
    },
  },
];

export const DEFAULT_THEME = THEMES[0].id;
const STORAGE_KEY = "wedding_theme_v2";

const toRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

export function applyTheme(id) {
  const theme = getTheme(id);
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([k, v]) => {
    root.style.setProperty(`--c-${k}`, toRgb(v));
    root.style.setProperty(`--hex-${k}`, v);
  });
  const pattern = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Cg fill='none' stroke='${encodeURIComponent(theme.colors.gold)}' stroke-opacity='.1'%3E%3Cpath d='M36 8c4 8 12 12 12 22a12 12 0 1 1-24 0c0-10 8-14 12-22z'/%3E%3Ccircle cx='36' cy='54' r='2.5'/%3E%3Cpath d='M10 36h10m32 0h10'/%3E%3C/g%3E%3C/svg%3E")`;
  root.style.setProperty("--pattern-url", pattern);
  root.dataset.theme = theme.id;
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme.id }));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme.colors.maroondark);
  return theme;
}

export function loadSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
}

/** Read the current theme colour as hex (for canvas drawing). */
export function themeHex(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--hex-${name}`).trim() || "#000000";
}
