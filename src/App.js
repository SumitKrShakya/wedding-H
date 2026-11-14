import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import ThemePicker from "./components/ThemePicker";
import Cover from "./components/Cover";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import SaveTheDate from "./components/SaveTheDate";
import Families from "./components/Families";
import Events from "./components/Events";
import Venues from "./components/Venues";
import Couple from "./components/Couple";
import Rsvp from "./components/Rsvp";
import FinalSection from "./components/FinalSection";
import FloatingControls from "./components/FloatingControls";
import Petals from "./components/Petals";
import { AUDIO_URL, VENUES } from "./config";

function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[60] bg-ivory flex flex-col items-center justify-center"
      data-testid="loading-screen"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-gold/40 border-t-maroondark animate-spin-slow" />
        <span className="absolute inset-2 rounded-full border border-gold/25" />
        <span className="font-script text-3xl text-golddeep">T&amp;A</span>
      </div>
      <p className="font-devanagari text-golddeep text-sm mt-8">॥ श्री गणेशाय नमः ॥</p>
    </motion.div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("loading"); // loading -> cover -> open
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p === "loading" ? "cover" : p)), 1700);
    return () => clearTimeout(t);
  }, []);

  // Cover opens on its own 2.2 seconds after it appears
  useEffect(() => {
    if (phase !== "cover") return;
    const t = setTimeout(openInvitation, 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Browsers block music until the guest interacts, so start it on the first tap / key / scroll
  useEffect(() => {
    if (phase !== "open" || playing || !AUDIO_URL) return;
    const start = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.5;
      audio.play().then(() => setPlaying(true)).catch(() => {});
      cleanup();
    };
    const evs = ["pointerdown", "keydown", "touchstart", "wheel"];
    const cleanup = () => evs.forEach((e) => window.removeEventListener(e, start));
    evs.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return cleanup;
  }, [phase, playing]);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const openInvitation = () => {
    setPhase("open");
    window.scrollTo(0, 0);
    const audio = audioRef.current;
    if (audio && AUDIO_URL) {
      audio.volume = 0.5;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || !AUDIO_URL) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <div className="relative min-h-screen bg-ivory text-cocoa font-body">
      <Toaster position="top-center" richColors />
      <Petals />
      <div className="grain-overlay" aria-hidden="true" />
      {AUDIO_URL && <audio ref={audioRef} src={AUDIO_URL} loop preload="none" />}

      <AnimatePresence>
        {phase === "loading" && <Loader key="loader" />}
        {phase === "cover" && <Cover key="cover" onOpen={openInvitation} />}
      </AnimatePresence>

      {phase === "open" && (
        <>
          <TopBar />
          <main>
            <Hero />
            <SaveTheDate />
            <Families />
            <Events />
            {VENUES.length > 0 && <Venues />}
            <Couple />
            <Rsvp />
          </main>
          <FinalSection />
          <FloatingControls playing={playing} onToggleMusic={toggleMusic} />
        </>
      )}

      {phase !== "loading" && <ThemePicker />}
    </div>
  );
}
