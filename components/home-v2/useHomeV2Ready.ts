"use client";

import { useEffect, useState } from "react";

/** Brief demo load state so skeletons can show while remote media settles. */
export function useHomeV2Ready(delayMs = 700) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduce ? 0 : delayMs;
    const timer = window.setTimeout(() => setReady(true), wait);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return ready;
}
