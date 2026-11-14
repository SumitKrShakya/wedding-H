/* ==========================================================================
   EDITABLE WEDDING SETTINGS — everything the family may want to change later
   lives in this one file.
   ========================================================================== */

export const DATE_RANGE = "9 – 13 December 2026";

export const COUPLE = {
  groom: "Tanishk",
  bride: "Aishwarya",
};

// Countdown target: 13 December 2026 (wedding day), midnight Indian Standard Time (UTC+5:30)
export const COUNTDOWN_TARGET_IST = "2026-12-13T00:00:00+05:30";

// EDITABLE: background music file. Replace with your own royalty-free track
// placed in frontend/public/audio/. Leave empty ("") to disable music entirely.
export const AUDIO_URL = "/audio/dhun.mp3";

// EDITABLE: your WhatsApp number in international format, e.g. "919876543210".
// Used only for the "Confirm on WhatsApp" RSVP option. Leave empty ("") to hide it.
export const WHATSAPP_NUMBER = "918447301076";

// EDITABLE: paste the exact Google Maps links for each venue here once known.
// Until then the Get Directions buttons open a Google Maps search for the venue name.
export const VENUE_MAPS = {
  kirtan: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ananda Banquets, 33/33A Rama Road, Najafgarh Road Industrial Area, New Delhi 110015"),
  "haldi-mehandi": "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("26/166 West Patel Nagar, near Community Centre, New Delhi 110008"),
  wedding: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("The Grand Horizon Banquet, 11A Shivaji Marg, Najafgarh Road, New Delhi 110015"),
};

// EDITABLE: home address shown for Haldi & Mehandi.
export const HOME_ADDRESS = "26/166, Ground Floor, West Patel Nagar, New Delhi - 110008";
export const HOME_LANDMARK = "Near Community Centre";

export function mapsUrlFor(venueKey, venueName) {
  const saved = VENUE_MAPS[venueKey];
  if (saved) return saved;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}`;
}

/* ------------------------------------------------------------------ */
/* Wedding programme — order, dates and times exactly as finalised.   */
/* "palette" picks the section colours used by the "Wedding           */
/* Celebration" theme (defined in src/index.css: kirtan, haldi,       */
/* mehandi, shadi, rsvp).                                             */
/* ------------------------------------------------------------------ */

export const EVENTS = [
  { day: 1, dayLabel: "Day 1 — 9 December 2026", name: "Mata Ki Chowki", time: "6:30 PM Onwards", venue: "Ananda Banquets, Rama Road", venueKey: "kirtan", icon: "music", palette: "kirtan" },
  { day: 2, dayLabel: "Day 2 — 11 December 2026", name: "Haldi", time: "Afternoon", venue: "At Home", venueKey: "haldi-mehandi", icon: "sun", palette: "haldi" },
  { day: 2, name: "Mehandi", time: "Evening", venue: "At Home", venueKey: "haldi-mehandi", icon: "hand", palette: "mehandi" },
  { day: 3, dayLabel: "Day 3 — 13 December 2026", name: "Reception", time: "6:30 PM – Till the Stars Fade", venue: "The Grand Horizon Banquet, Najafgarh Rd", venueKey: "wedding", icon: "landmark", palette: "shadi" },
];

// EDITABLE: venue cards. The "Venues" section is hidden if this list is empty.
export const VENUES = [
  {
    key: "kirtan",
    palette: "kirtan",
    name: "Ananda Banquets",
    date: "9 December 2026",
    address: "33/33A, Rama Road, Opp. Apollo Cradle Hospital, Najafgarh Road, Industrial Area, New Delhi - 110015",
    functions: ["Mata Ki Chowki · 6:30 PM onwards"],
    image: "/images/venues/venue-1.jpg",
    imagePosition: "center",
  },
  {
    key: "wedding",
    palette: "shadi",
    name: "The Grand Horizon Banquet",
    date: "13 December 2026",
    address: "Plot No. 11A, Shivaji Marg, Najafgarh Road, Adjacent to Apollo Cradle, New Delhi - 110015",
    functions: ["Reception · 6:30 PM till the stars fade"],
    image: "/images/venues/venue-2.jpg",
    imagePosition: "center",
  },
];

export const FAMILIES = [
  {
    side: "Groom's Family",
    members: [
      { label: "Dada – Dadi", names: "Late Sh. Narayan Das Gandhi & Smt. Usha Gandhi" },
      { label: "Nana – Nani", names: "Late Sh. Sunder Arora & Late Smt. Urmil Arora" },
      { label: "Parents", names: "Sh. Varinder Kr. Gandhi & Smt. Sarita Gandhi" },
    ],
  },
  {
    side: "Bride's Family",
    members: [
      { label: "Dada – Dadi", names: "Late Sh. Khemachand Jain & Late Smt. Rukmani Jain" },
      { label: "Nana – Nani", names: "Sh. Sheel Chand Jain & Smt. Pushpa Bai Jain" },
      { label: "Parents", names: "Sh. Praveen Jain & Smt. Sandhya Jain" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Backend (optional)                                                 */
/* ------------------------------------------------------------------ */
// EDITABLE: base URL of a backend that implements POST /api/rsvp,
// GET/POST /api/wishes, DELETE /api/wishes/:id and POST /api/admin/verify.
// Set VITE_API_URL in a .env file, e.g. VITE_API_URL=https://my-server.com
// Leave it unset to run without a server: RSVPs are sent to WhatsApp and
// blessings are saved in the visitor's own browser.
export const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "";

// EDITABLE: PIN for "Manage wishes" when running without a backend.
export const LOCAL_ADMIN_PIN = "1234";
