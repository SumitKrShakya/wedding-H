/* ==========================================================================
   Invitation variants, picked by a random code in the link: /?i=<code>

     /?i=gqi6r   → main: all days (9, 11, 13), with RSVP
     /?i=bhdtv   → 13 Dec reception only, no events section
     /?i=pcdub   → all days (9, 11, 13), no RSVP
     /?i=8p28i   → 9 & 13 Dec only, no RSVP

   The plain address (no code) or a wrong code shows the 13 Dec reception
   version, so nobody can see the other days by editing the link.

   EDITABLE: to change a code, edit the key below (5 random letters/digits).
   ========================================================================== */
import { EVENTS, VENUES } from "./config";

const RECEPTION_ONLY = { dates: [13], showEvents: false, showRsvp: true };

export const INVITE_VARIANTS = {
  gqi6r: { dates: [9, 11, 13], showEvents: true, showRsvp: true },
  bhdtv: RECEPTION_ONLY,
  pcdub: { dates: [9, 11, 13], showEvents: true, showRsvp: false },
  "8p28i": { dates: [9, 13], showEvents: true, showRsvp: false },
};

function readVariant() {
  try {
    const code = (new URLSearchParams(window.location.search).get("i") || "").trim().toLowerCase();
    return INVITE_VARIANTS[code] || RECEPTION_ONLY;
  } catch {
    return RECEPTION_ONLY;
  }
}

export const VARIANT = readVariant();

export const DATE_LABEL = `${VARIANT.dates.join(" | ")} December 2026`;

export const hasDate = (d) => VARIANT.dates.includes(d);

export const VARIANT_EVENTS = EVENTS.filter((e) => hasDate(e.date));
export const VARIANT_VENUES = VENUES.filter((v) => hasDate(v.dateNum));
export const SHOW_HOME_CARD = hasDate(11);
