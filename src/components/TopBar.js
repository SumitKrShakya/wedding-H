import { motion } from "framer-motion";

const LINKS = [
  { href: "#save-the-date", label: "Save the Date" },
  { href: "#families", label: "Families" },
  { href: "#couple", label: "The Couple" },
  { href: "#events", label: "Events" },
  { href: "#venues", label: "Venues" },
];

export default function TopBar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-40 bg-ivory/85 backdrop-blur-md border-b border-gold/25"
      data-testid="top-bar"
    >
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#home" className="font-script text-2xl text-maroondark leading-none" data-testid="topbar-monogram">
          Tanishk &amp; Aishwarya
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-[0.22em] text-cocoa-soft hover:text-maroon transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#rsvp"
          data-testid="topbar-rsvp-link"
          className="bg-maroondark text-champagne text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 md:px-5 py-2 rounded-full border border-gold/50 hover:bg-maroon transition-colors duration-300"
        >
          RSVP
        </a>
      </div>
    </motion.header>
  );
}
