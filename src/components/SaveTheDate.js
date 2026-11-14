import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import useCountdown from "../hooks/useCountdown";
import { COUNTDOWN_TARGET_IST } from "../config";
import { SectionHeading, Divider } from "./Ornaments";
import ScratchCard from "./ScratchCard";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function DecemberCalendar() {
  const firstDay = new Date(2026, 11, 1).getDay();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekdayLong = (d) =>
    new Date(2026, 11, d).toLocaleDateString("en-IN", { weekday: "long" });

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 70, y: 30 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
      className="royal-frame bg-ivory rounded-lg px-6 py-7 md:px-8 max-w-sm mx-auto shadow-gold-soft"
      data-testid="calendar-card"
    >
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-golddeep/50" />
        <p className="font-display text-2xl text-maroondark tracking-[0.14em]">DECEMBER 2026</p>
        <span className="h-px w-8 bg-golddeep/50" />
      </div>
      <div className="grid grid-cols-7 mt-5 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-[10px] uppercase tracking-[0.2em] text-golddeep py-1">
            {w}
          </span>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <span key={`b${i}`} />
        ))}
        {days.map((d) => {
          const weddingDay = d === 9 || d === 11 || d === 13;
          return (
            <span key={d} className="relative py-1.5 text-sm" data-testid={`calendar-day-${d}`}>
              <span
                className={`relative z-10 inline-flex w-8 h-8 items-center justify-center rounded-full ${
                  weddingDay
                    ? "bg-maroondark text-gold font-medium shadow-glow-gold"
                    : "text-cocoa-soft"
                }`}
              >
                {d}
              </span>
            </span>
          );
        })}
      </div>
      <p className="font-display italic text-cocoa-soft text-sm mt-4 text-center">
        {weekdayLong(9)}, {weekdayLong(11)} &amp; {weekdayLong(13)} — the celebration days
      </p>
    </motion.div>
  );
}

function Countdown() {
  const t = useCountdown(COUNTDOWN_TARGET_IST);

  if (!t) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="pattern-maroon rounded-2xl max-w-2xl mx-auto px-8 py-14 text-center"
        data-testid="countdown-finished"
      >
        <Heart size={30} className="text-gold mx-auto animate-pulse-soft" fill="currentColor" />
        <p className="font-script text-4xl md:text-5xl text-gold mt-5 leading-snug">
          Our Forever Has Begun
        </p>
        <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] mt-4">
          Thank you for your love &amp; blessings
        </p>
      </motion.div>
    );
  }

  const units = [
    { label: "Days", value: t.days, testid: "countdown-days" },
    { label: "Hours", value: t.hours, testid: "countdown-hours" },
    { label: "Minutes", value: t.minutes, testid: "countdown-minutes" },
    { label: "Seconds", value: t.seconds, testid: "countdown-seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="pattern-maroon rounded-2xl max-w-2xl mx-auto px-6 py-9 md:px-12 text-center shadow-gold-soft"
      data-testid="countdown-panel"
    >
      <p className="text-gold/80 text-[10px] md:text-[11px] uppercase tracking-[0.38em]">
        Counting down to the big day
      </p>
      <div className="grid grid-cols-4 gap-2 md:gap-6 mt-7">
        {units.map((u, i) => (
          <div
            key={u.label}
            className={`${i < 3 ? "border-r border-gold/20" : ""} px-1`}
            data-testid={u.testid}
          >
            <p className="font-display text-3xl sm:text-4xl md:text-6xl text-gold leading-none tabular-nums gold-text-shimmer">
              {String(u.value).padStart(2, "0")}
            </p>
            <p className="text-ivory/70 text-[9px] md:text-[10px] uppercase tracking-[0.28em] mt-2">
              {u.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SaveTheDate() {
  return (
    <section id="save-the-date" className="relative py-24 md:py-32 bg-champagne" data-testid="save-the-date-section">
      <SectionHeading eyebrow="Mark your calendar" title="Save the Date" />
      <div className="max-w-4xl mx-auto mt-12 px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScratchCard />
        </motion.div>
        <DecemberCalendar />
        <Countdown />
        <Divider />
      </div>
    </section>
  );
}
