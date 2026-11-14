import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Divider, CornerFloral } from "./Ornaments";

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-24"
      data-testid="hero-section"
    >
      <CornerFloral className="absolute -top-6 -left-6 w-36 md:w-56 opacity-70" />
      <CornerFloral className="absolute -top-6 -right-6 w-36 md:w-56 opacity-70 -scale-x-100" flip />
      <CornerFloral className="absolute -bottom-8 -left-8 w-32 md:w-48 opacity-50 -scale-y-100" />
      <CornerFloral className="absolute -bottom-8 -right-8 w-32 md:w-48 opacity-50 -scale-100" />

      <div className="relative text-center px-6 max-w-3xl">
        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-[11px] uppercase tracking-[0.4em] text-golddeep"
        >
          The Reception of
        </motion.p>

        <motion.h1
          variants={rise}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-script text-maroondark text-6xl md:text-8xl leading-[1.1] mt-4"
        >
          Tanishk <span className="font-display italic text-golddeep text-4xl md:text-6xl align-middle">&amp;</span> <span className="script-cap-a">A</span>ishwarya
        </motion.h1>

        <motion.div variants={rise} initial="hidden" animate="show" custom={2}>
          <Divider className="mt-6" />
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex justify-center mt-8"
        >
          <div className="royal-frame arch-top bg-champagne p-2.5 shadow-gold-soft">
            <img
              src="/images/couple/couple-main.jpg"
              alt="Tanishk and Aishwarya"
              className="w-48 sm:w-56 md:w-64 arch-top object-cover"
              draggable="false"
            />
          </div>
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={4}
          className="font-display text-xl md:text-2xl text-maroondark tracking-[0.14em] mt-4"
        >
          9 – 13 December 2026
        </motion.p>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={5}
          className="text-[10px] sm:text-xs md:text-sm text-cocoa-soft tracking-[0.12em] sm:tracking-[0.2em] uppercase mt-2 leading-relaxed"
        >
          New Delhi
        </motion.p>
      </div>

      <motion.a
        href="#save-the-date"
        data-testid="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-golddeep"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
