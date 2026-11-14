import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "../config";
import { submitRsvp } from "../api";
import { SectionHeading } from "./Ornaments";

const ATTEND_OPTIONS = [
  { value: "yes", label: "Joyfully Yes" },
  { value: "no", label: "Regretfully No" },
];

const labelCls = "block text-[10px] uppercase tracking-[0.3em] text-golddeep mb-2";
const inputCls =
  "w-full bg-transparent border-b border-golddeep/40 focus:border-maroon outline-none py-2.5 text-cocoa placeholder:text-cocoa-soft/40 transition-colors duration-300";

export default function Rsvp() {
  const [form, setForm] = useState({ name: "", guests: "2", attending: "yes", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please tell us your name.");
      return;
    }
    setSubmitting(true);
    try {
      const data = await submitRsvp({
        name: form.name.trim(),
        guests: Number(form.guests),
        attending: form.attending,
        message: form.message.trim(),
      });
      setDone({ ...form, name: form.name.trim(), attending: data.attending });
    } catch (err) {
      toast.error("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-24 md:py-32 bg-champagne pal-rsvp" data-testid="rsvp-section">
      <SectionHeading
        eyebrow="RSVP"
        title="Your Presence Is Our Greatest Gift"
        sub="We would be honoured to have you celebrate our special moments with us."
      />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="royal-frame bg-ivory rounded-lg max-w-xl mx-auto mt-14 px-7 py-10 md:px-10 shadow-gold-soft"
      >
        {done ? (
          <div className="text-center py-6" data-testid="rsvp-confirmation">
            <span className="inline-flex w-16 h-16 rounded-full pattern-maroon border border-gold/60 items-center justify-center">
              <Heart size={26} className="text-gold" fill="currentColor" />
            </span>
            <h3 className="font-display text-3xl text-maroondark mt-6">Thank You{done.name ? `, ${done.name}` : ""}!</h3>
            <p className="mt-4 text-sm md:text-base text-cocoa-soft leading-relaxed">
              Your response has been received with love.
              {done.attending === "yes"
                ? " We look forward to celebrating with you from 9 to 13 December 2026."
                : " You will be in our hearts and prayers."}
            </p>
            <button
              onClick={() => {
                setDone(null);
                setForm({ name: "", guests: "2", attending: "yes", message: "" });
              }}
              data-testid="rsvp-send-another-button"
              className="mt-8 text-[11px] uppercase tracking-[0.25em] text-golddeep underline underline-offset-4 hover:text-maroon transition-colors"
            >
              Send another response
            </button>
          </div>
        ) : (
          <form onSubmit={submit} data-testid="rsvp-form" className="space-y-8">
            <div>
              <label htmlFor="rsvp-name" className={labelCls}>Guest name</label>
              <input
                id="rsvp-name"
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="Your full name"
                className={inputCls}
                data-testid="rsvp-name-input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="rsvp-guests" className={labelCls}>Number of attendees</label>
                <div className="relative">
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={set("guests")}
                    className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                    data-testid="rsvp-guests-select"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="absolute right-1 top-1/2 -translate-y-1/2 text-golddeep pointer-events-none" />
                </div>
              </div>

              <div>
                <span className={labelCls}>Attending?</span>
                <div className="flex gap-3">
                  {ATTEND_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, attending: o.value }))}
                      data-testid={`rsvp-attending-${o.value}`}
                      className={`flex-1 text-[11px] uppercase tracking-[0.18em] px-3 py-2.5 rounded-full border transition-colors duration-300 ${
                        form.attending === o.value
                          ? "bg-maroon text-ivory border-maroon"
                          : "border-golddeep/50 text-cocoa-soft hover:border-maroon"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="rsvp-message" className={labelCls}>Message (optional)</label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={form.message}
                onChange={set("message")}
                placeholder="Your wishes for the couple…"
                className={`${inputCls} resize-none`}
                data-testid="rsvp-message-input"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              data-testid="rsvp-submit-button"
              className="w-full bg-maroondark text-gold text-[11px] md:text-xs uppercase tracking-[0.3em] py-4 rounded-full border border-gold/50 transition-colors duration-300 hover:bg-maroon disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit RSVP"}
            </button>

            {WHATSAPP_NUMBER && (
              <p className="text-center text-xs text-cocoa-soft">
                or{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Namaste! RSVP for Tanishk & Aishwarya's reception (9–13 December 2026): "
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-golddeep hover:text-maroon"
                  data-testid="rsvp-whatsapp-link"
                >
                  confirm on WhatsApp
                </a>
              </p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
