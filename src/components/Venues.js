import { motion } from "framer-motion";
import { MapPin, Flower2, Sun, Hand, Home, Clock } from "lucide-react";
import { VENUES, mapsUrlFor, HOME_ADDRESS, HOME_LANDMARK } from "../config";
import { SectionHeading, CornerFloral } from "./Ornaments";

function VenueCard({ venue, index }) {
  // The whole card (photo, text and button) opens Google Maps directions
  return (
    <motion.a
      href={mapsUrlFor(venue.key, venue.name)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get directions to ${venue.name}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group block royal-frame bg-champagne rounded-lg overflow-hidden shadow-gold-soft cursor-pointer ${venue.palette ? `pal-${venue.palette}` : ""}`}
      data-testid={`venue-card-${venue.key}`}
    >
      <div className="h-52 md:h-60 overflow-hidden border-b border-gold/40">
        <img
          src={venue.image}
          alt={venue.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: venue.imagePosition || "center" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      <div className="p-7 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-golddeep">{venue.date}</p>
        <h3 className="font-display text-2xl md:text-3xl text-maroondark mt-2">{venue.name}</h3>
        {venue.address && (
          <p className="mt-3 flex items-start justify-center gap-1.5 text-sm text-cocoa-soft leading-relaxed max-w-xs mx-auto" data-testid={`venue-address-${venue.key}`}>
            <MapPin size={14} className="text-golddeep shrink-0 mt-[3px]" />
            <span>{venue.address}</span>
          </p>
        )}
        <div className="h-px w-12 bg-golddeep/50 mx-auto mt-4" />
        <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm text-cocoa-soft">
          {venue.functions.map((f) => (
            <li key={f} className="flex items-center justify-center gap-1.5">
              <Flower2 size={12} className="text-golddeep shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <span
          data-testid={`venue-directions-${venue.key}`}
          className="mt-7 inline-flex items-center gap-2 border-2 border-golddeep text-maroondark font-bold text-xs uppercase tracking-[0.22em] px-7 py-3 rounded-full transition-colors duration-300 group-hover:bg-maroon group-hover:text-ivory group-hover:border-maroon"
        >
          <MapPin size={15} strokeWidth={2.5} />
          Get Directions
        </span>
      </div>
    </motion.a>
  );
}

export default function Venues() {
  return (
    <section id="venues" className="relative py-24 md:py-32 bg-ivory" data-testid="venues-section">
      <SectionHeading
        eyebrow="Where we celebrate"
        title="The Venues"
        sub="Find your way to our celebrations."
      />
      <div className="max-w-4xl mx-auto mt-14 px-6 grid md:grid-cols-2 gap-8 md:gap-10">
        {VENUES.map((v, i) => (
          <VenueCard key={v.key} venue={v} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto mt-8 md:mt-10 px-6"
        data-testid="home-celebrations"
      >
        <div className="royal-frame relative rounded-lg bg-champagne overflow-hidden shadow-gold-soft px-5 pt-10 pb-6 sm:px-8 sm:pb-8 text-center">
          {/* Haldi-to-Mehandi colour strip */}
          <span
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#EA580C] via-[#F5B301] to-[#3F7D20]"
            aria-hidden="true"
          />
          <CornerFloral className="absolute -top-2 -left-2 w-16 md:w-24 opacity-60" />
          <CornerFloral className="absolute -top-2 -right-2 w-16 md:w-24 opacity-60" flip />

          <span className="relative inline-flex w-14 h-14 rounded-full pattern-maroon border border-gold/60 shadow-glow-gold items-center justify-center text-gold">
            <Home size={22} strokeWidth={1.6} />
          </span>
          <p className="relative text-[10px] uppercase tracking-[0.3em] text-golddeep mt-5">11 December 2026</p>
          <h3 className="relative font-display text-2xl md:text-3xl text-maroondark mt-2">Celebrations at Home</h3>
          <a
            href={mapsUrlFor("haldi-mehandi", HOME_ADDRESS)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block mt-3 max-w-sm mx-auto"
            data-testid="home-address"
          >
            <span className="flex items-start justify-center gap-1.5 text-sm text-cocoa-soft leading-relaxed">
              <MapPin size={14} className="text-golddeep shrink-0 mt-[3px]" />
              <span>
                {HOME_ADDRESS}
                <span className="block italic font-display text-base text-cocoa-soft/90">({HOME_LANDMARK})</span>
              </span>
            </span>
            <span className="mt-4 inline-flex items-center gap-2 border-2 border-golddeep text-maroondark font-bold text-xs uppercase tracking-[0.22em] px-6 py-2.5 rounded-full transition-colors duration-300 group-hover:bg-maroon group-hover:text-ivory group-hover:border-maroon">
              <MapPin size={15} strokeWidth={2.5} />
              Get Directions
            </span>
          </a>
          <div className="h-px w-12 bg-golddeep/50 mx-auto mt-5" />

          <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Haldi", time: "Afternoon", Icon: Sun, pal: "pal-haldi", note: "Turmeric, laughter & sunshine" },
              { name: "Mehandi", time: "Evening", Icon: Hand, pal: "pal-mehandi", note: "Henna, songs & celebrations" },
            ].map(({ name, time, Icon, pal, note }) => (
              <div
                key={name}
                className={`${pal} royal-frame rounded-lg bg-ivory px-5 py-5 flex items-center gap-4 text-left`}
                data-testid={`home-event-${name.toLowerCase()}`}
              >
                <span className="w-12 h-12 rounded-full pattern-maroon border border-gold/60 flex items-center justify-center text-gold shrink-0">
                  <Icon size={19} strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-xl md:text-2xl text-maroondark leading-tight">{name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-cocoa-soft mt-1">
                    <Clock size={13} className="text-golddeep shrink-0" />
                    {time}
                  </p>
                  <p className="text-xs text-cocoa-soft/80 italic font-display mt-1">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
