import { motion } from "framer-motion";
import { Clock, MapPin, Gem, Landmark, Sparkles, Music, Sun, Drum, UtensilsCrossed, Home, Hand } from "lucide-react";
import { EVENTS } from "../config";
import { SectionHeading } from "./Ornaments";

const ICONS = {
  gem: Gem,
  landmark: Landmark,
  sparkles: Sparkles,
  music: Music,
  sun: Sun,
  drum: Drum,
  utensils: UtensilsCrossed,
  home: Home,
  hand: Hand,
};

function EventRow({ event, index }) {
  const Icon = ICONS[event.icon] || Sparkles;
  const leftSide = index % 2 === 0;

  return (
    <div className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-24 mb-8 md:mb-12 ${event.palette ? `pal-${event.palette}` : ""}`}>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10 w-11 h-11 rounded-full pattern-maroon border border-gold/60 shadow-glow-gold flex items-center justify-center text-gold"
        data-testid={`event-icon-${event.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <Icon size={18} strokeWidth={1.6} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`royal-frame bg-ivory rounded-lg px-6 py-6 shadow-gold-soft ${
          leftSide ? "md:col-start-1" : "md:col-start-2"
        }`}
        data-testid={`event-card-${event.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <span
          className="absolute inset-x-0 top-0 h-1.5 rounded-t-lg bg-gradient-to-r from-maroondark via-maroon to-gold"
          aria-hidden="true"
        />
        <span className="absolute top-4 right-5 font-display text-2xl text-gold/45" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-2xl text-maroondark pr-10">{event.name}</h3>
        <div className="mt-3 space-y-1.5">
          <p className="flex items-center gap-2 text-sm text-cocoa-soft">
            <Clock size={14} className="text-golddeep shrink-0" />
            <span>{event.time}</span>
          </p>
          <p className="flex items-center gap-2 text-sm text-cocoa-soft">
            <MapPin size={14} className="text-golddeep shrink-0" />
            <span>{event.venue}</span>
          </p>
        </div>
        {event.note && (
          <span className="inline-block mt-4 bg-gold/15 text-golddeep text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
            {event.note}
          </span>
        )}
      </motion.div>
    </div>
  );
}

function DayBlock({ dayLabel, events, startIndex }) {
  return (
    <div className="relative">
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gold/50 md:-translate-x-1/2" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
        className={`relative z-10 flex justify-center mb-12 pl-16 md:pl-0 ${events[0]?.palette ? `pal-${events[0].palette}` : ""}`}
      >
        <span className="pattern-maroon text-gold text-[10px] md:text-[11px] uppercase tracking-[0.3em] px-6 py-2.5 rounded-full border border-gold/50" data-testid={`day-band-${dayLabel.slice(4, 5)}`}>
          {dayLabel}
        </span>
      </motion.div>
      {events.map((e, i) => (
        <EventRow key={e.name} event={e} index={startIndex + i} />
      ))}
    </div>
  );
}

export default function Events() {
  const days = [1, 2, 3];
  return (
    <section id="events" className="relative py-24 md:py-32 bg-champagne" data-testid="events-section">
      <SectionHeading
        eyebrow="Wedding celebrations"
        title="Three Days of Joy & Rituals"
        sub="Every moment of our celebration, lovingly planned for you."
      />
      <div className="max-w-5xl mx-auto mt-16 px-6">
        {days.map((d) => {
          const events = EVENTS.filter((e) => e.day === d);
          const startIndex = EVENTS.findIndex((e) => e.day === d);
          return (
            <DayBlock
              key={d}
              dayLabel={events[0].dayLabel}
              events={events}
              startIndex={startIndex}
            />
          );
        })}
      </div>
    </section>
  );
}
