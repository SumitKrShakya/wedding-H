import axios from "axios";
import { API_BASE, LOCAL_ADMIN_PIN, WHATSAPP_NUMBER } from "./config";

const WISHES_KEY = "wedding_wishes";

const readWishes = () => {
  try {
    return JSON.parse(localStorage.getItem(WISHES_KEY)) || [];
  } catch {
    return [];
  }
};
const writeWishes = (w) => {
  try {
    localStorage.setItem(WISHES_KEY, JSON.stringify(w));
  } catch {
    /* ignore */
  }
};

export async function submitRsvp(payload) {
  if (API_BASE) {
    const { data } = await axios.post(`${API_BASE}/rsvp`, payload);
    return data;
  }
  // No backend: send the RSVP to the family on WhatsApp.
  if (WHATSAPP_NUMBER) {
    const lines = [
      "Namaste! RSVP for Tanishk & Aishwarya's reception (9–13 December 2026)",
      `Name: ${payload.name}`,
      `Attending: ${payload.attending === "yes" ? "Joyfully Yes" : "Regretfully No"}`,
      `Guests: ${payload.guests}`,
      payload.message ? `Message: ${payload.message}` : "",
    ].filter(Boolean);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  return { attending: payload.attending };
}

export async function fetchWishes() {
  if (API_BASE) {
    const { data } = await axios.get(`${API_BASE}/wishes`);
    return data.wishes || [];
  }
  return readWishes();
}

export async function addWish(payload) {
  if (API_BASE) {
    const { data } = await axios.post(`${API_BASE}/wishes`, payload);
    return data;
  }
  const wish = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...payload };
  writeWishes([wish, ...readWishes()]);
  return wish;
}

export async function verifyAdmin(pin) {
  if (API_BASE) {
    await axios.post(`${API_BASE}/admin/verify`, {}, { headers: { "X-Admin-Pin": pin } });
    return;
  }
  if (pin !== LOCAL_ADMIN_PIN) throw new Error("bad pin");
}

export async function deleteWish(id, pin) {
  if (API_BASE) {
    await axios.delete(`${API_BASE}/wishes/${id}`, { headers: { "X-Admin-Pin": pin } });
    return;
  }
  if (pin !== LOCAL_ADMIN_PIN) {
    const err = new Error("unauthorised");
    err.response = { status: 401 };
    throw err;
  }
  writeWishes(readWishes().filter((w) => w.id !== id));
}
