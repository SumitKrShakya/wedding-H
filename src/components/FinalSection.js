import { DATE_LABEL } from "../variant";
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

export const INVITE_SHARE = {
  title: "Tanishk & Aishwarya | Reception Invitation",
  text: "You are cordially invited to the reception of Tanishk & Aishwarya — " + DATE_LABEL,
};

export async function shareInvitation() {
  const url = window.location.href;
  const payload = { ...INVITE_SHARE, url };
  if (navigator.share) {
    try {
      await navigator.share(payload);
      return;
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Invitation link copied — paste it anywhere to share");
  } catch {
    toast.error("Could not copy the link. Please copy it from the address bar.");
  }
}

export default function FinalSection() {
  return (
    <footer
      id="closing"
      className="relative pattern-maroon text-ivory overflow-hidden"
      data-testid="closing-section"
    >
      <div className="max-w-2xl mx-auto px-6 py-24 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/mandap.webp"
            alt=""
            aria-hidden="true"
            className="w-36 md:w-44 mx-auto opacity-90"
            draggable="false"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-2xl md:text-[2rem] text-champagne leading-snug mt-8"
        >
          Your presence will make our celebration even more special.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-script text-[2.6rem] leading-tight sm:text-5xl md:text-6xl text-gold mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4"
          data-testid="closing-names"
        >
          Tanishk
          <Heart size={26} className="text-gold animate-pulse-soft shrink-0" fill="currentColor" />
          <span><span className="script-cap-a">A</span>ishwarya</span>
        </motion.p>

        <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] mt-8">
          {DATE_LABEL}
        </p>

        <div className="flex items-center justify-center gap-3 mt-10" aria-hidden="true">
          <span className="h-px w-16 bg-gold/60" />
          <Heart size={13} className="text-gold" fill="currentColor" />
          <span className="h-px w-16 bg-gold/60" />
        </div>

        <button
          onClick={shareInvitation}
          data-testid="share-invitation-footer-button"
          className="mt-12 inline-flex items-center gap-2.5 border border-gold/60 text-gold text-[11px] uppercase tracking-[0.25em] px-8 py-3.5 rounded-full transition-colors duration-300 hover:bg-gold hover:text-maroondark"
        >
          <Share2 size={14} />
          Share this invitation
        </button>

        <p className="text-ivory/45 text-[10px] uppercase tracking-[0.3em] mt-14">
          With love &amp; blessings
        </p>
      </div>
    </footer>
  );
}
