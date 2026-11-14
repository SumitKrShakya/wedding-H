import { useEffect, useState } from "react";

const calc = (targetMs) => {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
};

export default function useCountdown(targetIso) {
  const targetMs = new Date(targetIso).getTime();
  const [time, setTime] = useState(() => calc(targetMs));

  useEffect(() => {
    const id = setInterval(() => setTime(calc(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return time;
}
