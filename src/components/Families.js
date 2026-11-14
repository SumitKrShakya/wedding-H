import { motion } from "framer-motion";
import { FAMILIES } from "../config";
import { SectionHeading, Divider, CornerFloral } from "./Ornaments";

function FamilyCard({ family, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="royal-frame arch-top relative bg-champagne pt-16 pb-12 px-8 text-center shadow-gold-soft"
      data-testid={`family-card-${index === 0 ? "groom" : "bride"}`}
    >
      <CornerFloral className="absolute top-2 left-2 w-20 md:w-24 opacity-80" />
      <CornerFloral className="absolute top-2 right-2 w-20 md:w-24 opacity-80" flip />

      <p className="text-[11px] uppercase tracking-[0.35em] text-golddeep">{family.side}</p>
      <Divider className="mt-5" />

      {family.members.map((m, i) => (
        <div key={m.label} className={i === 0 ? "mt-8" : "mt-9"}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-golddeep">{m.label}</p>
          <p className="font-display text-xl md:text-2xl text-cocoa leading-relaxed mt-3">{m.names}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function Families() {
  return (
    <section id="families" className="relative py-24 md:py-32 bg-ivory" data-testid="families-section">
      <SectionHeading
        eyebrow="With the blessings of"
        title="Our Families"
        sub="Two families, one beautiful bond of love."
      />
      <div className="max-w-4xl mx-auto mt-14 px-6 grid md:grid-cols-2 gap-8 md:gap-10">
        {FAMILIES.map((f, i) => (
          <FamilyCard key={f.side} family={f} index={i} />
        ))}
      </div>
    </section>
  );
}
