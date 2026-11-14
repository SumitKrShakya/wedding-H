# Wedding Invitation (React + Vite + Tailwind)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production files in dist/ (upload to Netlify / Vercel / any static host)

## Where to edit
- `src/config.js` – events, venues, families, map links, WhatsApp number, music, countdown date
- Names / dates in text – search for "Tanishk" / "Aishwarya" in `src/components/` and `index.html`
- Photos – `public/images/couple/couple-01.jpg` (hero) and `couple-01..04.jpg` (gallery list in `src/components/Couple.js`)
- Theme colours – `src/themes.js` (add or change entries; the picker updates automatically)
- Music – `public/audio/wedding-song.mp3`

## RSVP & blessings
Without a backend, RSVP opens WhatsApp with the guest's details pre-filled, and blessings are
stored in each visitor's own browser (admin PIN: `LOCAL_ADMIN_PIN` in config).
To share blessings between all guests, set `VITE_API_URL` in a `.env` file to a server that
implements `/api/rsvp`, `/api/wishes`, `/api/wishes/:id` and `/api/admin/verify`.
