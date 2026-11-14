import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check, X } from "lucide-react";
import { THEMES, applyTheme, loadSavedTheme, saveTheme } from "../themes";

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(loadSavedTheme);
  const panelRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => panelRef.current && !panelRef.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id) => {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    applyTheme(id);
    saveTheme(id);
    setCurrent(id);
    setTimeout(() => root.classList.remove("theme-anim"), 600);
  };

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.7 }}
      className="fixed bottom-[72px] md:bottom-[76px] right-4 md:right-5 z-[55]"
      data-testid="theme-picker"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="royal-frame !absolute bottom-12 md:bottom-14 right-0 w-64 max-w-[calc(100vw-2rem)] bg-ivory rounded-xl p-4 shadow-gold-soft origin-bottom-right"
            role="dialog"
            aria-label="Choose a theme colour"
          >
            <div className="flex items-center justify-between relative z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-golddeep">Theme Colour</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close theme picker"
                className="text-cocoa-soft hover:text-maroon transition-colors"
              >
                <X size={15} />
              </button>
            </div>
            <ul className="mt-3 space-y-1.5 relative z-10">
              {THEMES.map((t) => {
                const active = t.id === current;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => choose(t.id)}
                      data-testid={`theme-option-${t.id}`}
                      aria-pressed={active}
                      className={
                        "w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-200 " +
                        (active ? "bg-champagne" : "hover:bg-champagne/60")
                      }
                    >
                      <span
                        className="relative w-9 h-9 rounded-full shrink-0 overflow-hidden border"
                        style={{ borderColor: t.colors.gold, background: t.swatch || t.colors.maroondark }}
                        aria-hidden="true"
                      >
                        {!t.swatch && <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: t.colors.maroon }} />}
                        <span
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                          style={{ background: t.colors.gold, boxShadow: `0 0 0 2px ${t.colors.champagne}` }}
                        />
                      </span>
                      <span className="flex-1 font-display text-lg text-cocoa leading-tight">{t.name}</span>
                      {active && <Check size={16} className="text-golddeep shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme colour"
        aria-expanded={open}
        data-testid="theme-picker-button"
        className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-maroondark/95 text-gold border border-gold/50 shadow-gold-soft flex items-center justify-center backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Palette size={17} />
      </button>
    </motion.div>
  );
}
