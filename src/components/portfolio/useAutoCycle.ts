import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoCycle({
  length,
  initial = 0,
  interval = 6500,
}: {
  length: number;
  initial?: number;
  interval?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(initial);
  const [inView, setInView] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const select = useCallback(
    (index: number) => {
      setActive(((index % length) + length) % length);
      setCycleKey((current) => current + 1);
    },
    [length],
  );

  const shift = useCallback(
    (direction: number) => {
      setActive((current) => (((current + direction) % length) + length) % length);
      setCycleKey((current) => current + 1);
    },
    [length],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      {
        threshold: 0.28,
      },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEligible(desktop.matches && !reduced.matches && !document.hidden);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const running = eligible && inView && !paused;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => shift(1), interval);
    return () => window.clearTimeout(timer);
  }, [cycleKey, interval, running, shift]);

  return {
    rootRef,
    active,
    select,
    shift,
    setPaused,
    running,
    cycleKey,
    interval,
  };
}
