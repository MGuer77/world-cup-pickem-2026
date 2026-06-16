"use client";
import { useState, useEffect } from "react";

interface Countdown {
  d: number;
  h: number;
  m: number;
  s: number;
  total: number;
}

export function useCountdown(targetDate: string): Countdown {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const update = () =>
      setDiff(Math.max(0, new Date(targetDate).getTime() - Date.now()));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return {
    total: diff,
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  };
}
