const PETALS = Array.from({ length: 14 }, (_, i) => {
  const rand = (n) => {
    const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: (i * 7.31 + 3.2) % 100,
    delay: -rand(1) * 16,
    dur: 12 + rand(2) * 10,
    size: 10 + rand(3) * 10,
    drift: 18 + rand(4) * 26,
    marigold: i % 3 === 0,
  };
});

export default function Petals() {
  return (
    <div className="petal-wrap" aria-hidden="true" data-testid="petals-layer">
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        >
          <div className="petal-sway" style={{ "--drift": `${p.drift}px`, animationDuration: `${2.6 + (i % 4)}s` }}>
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 C7.5 7.5 4.5 11.5 4.5 15.5 a7.5 7.5 0 0 0 15 0 C19.5 11.5 16.5 7.5 12 2 Z"
                style={{ fill: p.marigold ? "var(--hex-marigold, #E0902F)" : "var(--hex-petal, #C89A55)" }}
                opacity={p.marigold ? 0.28 : 0.22}
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
