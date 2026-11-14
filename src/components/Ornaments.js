import { motion } from "framer-motion";

export function SectionHeading({ eyebrow, title, sub, dark = false, testid }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-2xl mx-auto px-6"
      data-testid={testid}
    >
      {eyebrow && (
        <div className={`flex items-center justify-center gap-3 ${dark ? "text-gold" : "text-golddeep"}`}>
          <span className="h-px w-8 bg-current opacity-60" />
          <p className="text-[11px] uppercase tracking-[0.38em]">{eyebrow}</p>
          <span className="h-px w-8 bg-current opacity-60" />
        </div>
      )}
      <h2
        className={`font-display mt-4 text-3xl md:text-[2.6rem] leading-snug ${
          dark ? "text-champagne" : "text-maroondark"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-3 text-sm md:text-base ${dark ? "text-champagne/75" : "text-cocoa-soft"}`}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

export function Divider({ dark = false, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-14 md:w-20 ${dark ? "bg-gold/70" : "bg-golddeep/60"}`} />
      <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true" className={dark ? "text-gold" : "text-golddeep"}>
        <path
          d="M17 1 C19.4 4.4 23 6.2 23 8.4 A6 6 0 0 1 11 8.4 C11 6.2 14.6 4.4 17 1 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="17" cy="8.6" r="1.1" fill="currentColor" />
      </svg>
      <span className={`h-px w-14 md:w-20 ${dark ? "bg-gold/70" : "bg-golddeep/60"}`} />
    </div>
  );
}

export function CornerFloral({ className = "", flip = false }) {
  return (
    <img
      src="/images/floral-corner.webp"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${flip ? "-scale-x-100" : ""} ${className}`}
    />
  );
}
