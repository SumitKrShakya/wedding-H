import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];

function Door({ side }) {
  return (
    <motion.div
      className={`absolute inset-y-0 w-1/2 pattern-maroon ${side === "left" ? "left-0" : "right-0"}`}
      initial={{ x: 0 }}
      exit={{ x: side === "left" ? "-100%" : "100%" }}
      transition={{ duration: 1.6, ease, delay: 0.35 }}
      data-testid={`cover-door-${side}`}
    >
      {side === "left" ? (
        <span className="absolute right-0 top-0 bottom-0 w-px bg-gold/60 shadow-[6px_0_18px_rgb(var(--c-gold)/0.35)]" />
      ) : (
        <span className="absolute left-0 top-0 bottom-0 w-px bg-gold/60 shadow-[-6px_0_18px_rgb(var(--c-gold)/0.35)]" />
      )}
    </motion.div>
  );
}

export default function Cover({ onOpen }) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden" data-testid="cover-screen" exit={{ opacity: 1, transition: { duration: 2.1 } }}>
      <Door side="left" />
      <Door side="right" />

      <motion.div
        className="absolute inset-3 md:inset-5 border border-gold/40 rounded-sm pointer-events-none z-10"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center p-4 overflow-y-auto"
        exit={{ opacity: 0, scale: 0.93, y: -36 }}
        transition={{ duration: 0.6, ease }}
      >
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="royal-frame arch-top relative bg-ivory w-full max-w-sm md:max-w-md px-7 pt-12 pb-10 md:px-10 text-center shadow-gold-soft my-6"
          data-testid="invitation-card"
        >
          <p className="font-devanagari text-golddeep text-sm md:text-base tracking-wide">
            ॥ श्री गणेशाय नमः ॥
          </p>

          <img
            src="/images/ganesha.webp"
            alt="Lord Ganesha"
            className="w-24 md:w-28 mx-auto mt-5 animate-float-soft"
            draggable="false"
          />

          <p className="mt-6 text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-cocoa-soft leading-relaxed">
            You are cordially invited to the wedding of
          </p>

          <h1 className="font-script text-maroondark mt-4 leading-[1.05]">
            <span className="block text-5xl md:text-6xl">Tanishk</span>
            <span className="block font-display italic text-golddeep text-3xl md:text-4xl my-1">&amp;</span>
            <span className="block text-5xl md:text-6xl"><span className="script-cap-a">A</span>ishwarya</span>
          </h1>

          <div className="flex items-center justify-center gap-3 mt-6" aria-hidden="true">
            <span className="h-px w-10 bg-golddeep/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <span className="h-px w-10 bg-golddeep/50" />
          </div>

          <p className="mt-6 text-sm md:text-[15px] text-cocoa-soft leading-relaxed">
            Together with our families,
            <br />
            we invite you to celebrate the beginning of our forever.
          </p>

          <p className="font-display text-lg md:text-xl text-maroondark mt-5 tracking-[0.12em]">
            9 – 13 December 2026
          </p>

          <div className="mt-8 flex items-center justify-center gap-2" aria-label="Opening invitation" data-testid="cover-opening-dots">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-golddeep"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
