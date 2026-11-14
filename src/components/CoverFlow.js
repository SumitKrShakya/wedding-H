import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CoverFlow({ items, renderItem, cardHeight = 420, testidPrefix = "carousel" }) {
  const [active, setActive] = useState(0);
  const [winW, setWinW] = useState(() => window.innerWidth);
  const dragX = useRef(null);
  const wheelLock = useRef(0);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const n = items.length;
  const cardW = winW >= 768 ? 300 : 235;
  const spacing = cardW * 0.64;
  const goTo = (i) => setActive(Math.max(0, Math.min(n - 1, i)));

  const onPointerDown = (e) => {
    dragX.current = e.clientX;
  };
  const onPointerMove = (e) => {
    if (dragX.current == null) return;
    const dx = e.clientX - dragX.current;
    if (Math.abs(dx) > 48) {
      goTo(active + (dx < 0 ? 1 : -1));
      dragX.current = null;
    }
  };
  const endDrag = () => {
    dragX.current = null;
  };
  const onWheel = (e) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    if (!d) return;
    const now = Date.now();
    if (now - wheelLock.current < 350) return;
    wheelLock.current = now;
    goTo(active + (d > 0 ? 1 : -1));
  };

  if (n === 0) return null;

  return (
    <div data-testid={`${testidPrefix}-carousel`}>
      <div
        className="relative mx-auto select-none"
        style={{ height: winW >= 768 ? cardHeight : Math.round(cardHeight * 0.8), perspective: "1400px", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, i) => {
          const off = i - active;
          const abs = Math.abs(off);
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                x: off * spacing,
                scale: abs === 0 ? 1 : abs === 1 ? 0.82 : 0.66,
                opacity: abs > 2 ? 0 : abs === 2 ? 0.32 : abs === 1 ? 0.55 : 1,
                rotateY: off === 0 ? 0 : off > 0 ? -26 : 26,
              }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
              className="absolute top-0 left-1/2"
              style={{
                width: cardW,
                marginLeft: -cardW / 2,
                zIndex: 30 - abs,
                transformStyle: "preserve-3d",
              }}
            >
              {renderItem(item, i, off)}
            </motion.div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
            data-testid={`${testidPrefix}-prev`}
            className="w-10 h-10 rounded-full border border-golddeep/50 text-golddeep flex items-center justify-center transition-colors duration-300 hover:bg-maroon hover:text-ivory hover:border-maroon disabled:opacity-30"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${i + 1}`}
                data-testid={`${testidPrefix}-dot-${i}`}
                className={`rounded-full h-2 transition-[width,background-color] duration-300 ${
                  i === active ? "w-5 bg-golddeep" : "w-2 bg-golddeep/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active === n - 1}
            aria-label="Next"
            data-testid={`${testidPrefix}-next`}
            className="w-10 h-10 rounded-full border border-golddeep/50 text-golddeep flex items-center justify-center transition-colors duration-300 hover:bg-maroon hover:text-ivory hover:border-maroon disabled:opacity-30"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
