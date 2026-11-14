import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { themeHex } from "../themes";

function ConfettiBurst({ origin }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["gold", "maroon", "champagne", "golddeep", "marigold", "maroondark"].map(themeHex);
    const ox = origin?.x ?? canvas.width / 2;
    const oy = origin?.y ?? canvas.height * 0.55;
    const parts = Array.from({ length: 170 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.0;
      const speed = 8 + Math.random() * 11;
      return {
        x: ox + (Math.random() - 0.5) * 90,
        y: oy + (Math.random() - 0.5) * 24,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 5 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        c: colors[(Math.random() * colors.length) | 0],
      };
    });
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const el = (t - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.vy += 0.28;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (el < 3.4) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // burst is one-shot; origin is captured at mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-[70] pointer-events-none" data-testid="confetti-burst" aria-hidden="true" />;
}

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);
  const [origin, setOrigin] = useState(null);
  const revealedRef = useRef(false);
  const scratching = useRef(false);
  const last = useRef(null);
  const moves = useRef(0);

  useEffect(() => {
    const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const box = canvas.parentElement.getBoundingClientRect();
    canvas.width = box.width;
    canvas.height = box.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = themeHex("maroondark");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = themeHex("gold") + "4D";
    ctx.lineWidth = 2;
    for (let x = -canvas.height; x < canvas.width + canvas.height; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + canvas.height, canvas.height);
      ctx.stroke();
    }
    ctx.fillStyle = themeHex("gold");
    ctx.font = "600 12px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("S C R A T C H   T O   R E V E A L", canvas.width / 2, canvas.height / 2 + 4);
    };
    paint();
    // Repaint the scratch layer in the new colours when the theme changes
    window.addEventListener("themechange", paint);
    return () => window.removeEventListener("themechange", paint);
  }, []);

  const getPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const draw = (from, to) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // opaque source erases fully
    ctx.lineWidth = 56;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 32) {
      total += 1;
      if (data[i] === 0) cleared += 1;
    }
    if (cleared / total > 0.4) reveal();
  };

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      // auto-scratch: sweep the remaining foil away in expanding circles
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 1)"; // opaque source erases fully
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, Math.max(w, h) * (0.16 + i * 0.2), 0, Math.PI * 2);
          ctx.fill();
        }, i * 45);
      }
      setTimeout(() => ctx.clearRect(0, 0, w, h), 320);
      const rect = canvas.getBoundingClientRect();
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setRevealed(true);
    setConfettiOn(true);
    setTimeout(() => setConfettiOn(false), 4000);
  };

  const onPointerDown = (e) => {
    if (revealedRef.current) return;
    scratching.current = true;
    canvasRef.current.setPointerCapture?.(e.pointerId);
    const p = getPos(e);
    draw(p, p);
    last.current = p;
  };
  const onPointerMove = (e) => {
    if (!scratching.current || revealedRef.current) return;
    const p = getPos(e);
    draw(last.current || p, p);
    last.current = p;
    moves.current += 1;
    if (moves.current % 6 === 0) checkProgress();
  };
  const endScratch = () => {
    scratching.current = false;
    last.current = null;
  };

  return (
    <div className="max-w-xl mx-auto" data-testid="scratch-card-wrap">
      <div className="royal-frame rounded-lg overflow-hidden relative h-52 md:h-60 shadow-gold-soft">
        <div className="absolute inset-0 bg-champagne flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-golddeep">Save the Date</p>
          <p className="font-display text-4xl md:text-5xl text-maroondark mt-2" data-testid="scratch-revealed-date">
            13 December 2026
          </p>
          <p className="font-script text-3xl md:text-4xl text-golddeep mt-2">Tanishk &amp; Aishwarya</p>
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            revealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endScratch}
          onPointerCancel={endScratch}
          data-testid="scratch-canvas"
        />
      </div>
      <button
        onClick={reveal}
        data-testid="scratch-reveal-button"
        className="mt-4 mx-auto flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-golddeep hover:text-maroon transition-colors duration-300"
      >
        <Sparkles size={13} />
        Reveal instantly
      </button>
      {confettiOn && <ConfettiBurst origin={origin} />}
    </div>
  );
}
