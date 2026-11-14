import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SectionHeading, Divider, CornerFloral } from "./Ornaments";

export default function Message() {
  return (
    <section
      id="message"
      className="relative py-24 md:py-36 bg-champagne overflow-hidden"
      data-testid="message-section"
    >
      <CornerFloral className="absolute top-0 -left-4 w-40 md:w-60 opacity-60" />
      <CornerFloral className="absolute bottom-0 -right-4 w-40 md:w-60 opacity-60 -scale-100" />

      <SectionHeading eyebrow="Our promise" title="Two Hearts, One Journey, Forever Together" />

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl mx-auto mt-12 px-6 text-center"
      >
        <p className="font-display italic text-lg md:text-2xl text-cocoa leading-relaxed">
          Some stories are written in the stars, some journeys are blessed by destiny, and some
          bonds are meant to last forever.
        </p>
        <p className="mt-8 text-sm md:text-base text-cocoa-soft leading-relaxed">
          With the love of our families and blessings of our elders, we are beginning a beautiful
          new chapter together.
        </p>
        <p className="mt-6 text-sm md:text-base text-cocoa-soft leading-relaxed">
          We would be delighted to have you by our side as we celebrate our wedding.
        </p>

        <Divider className="mt-12" />

        <p className="text-[11px] uppercase tracking-[0.3em] text-golddeep mt-10">With love,</p>
        <p className="font-script text-4xl md:text-5xl text-maroondark mt-3 flex items-center justify-center gap-3">
          Tanishk &amp; Aishwarya
          <Heart size={22} className="text-maroon animate-pulse-soft" fill="currentColor" />
        </p>
      </motion.div>
    </section>
  );
}
