import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cinematic technique: tracking shot.
 * A single decorative visual drifts against scroll per chapter. It never uses React state
 * during scrolling and falls back to the static composition for reduced-motion and mobile.
 */
export function ScrollDrift({
  children,
  className,
  speed = 0.08,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 767px)").matches;
    if (reducedMotion || compactViewport) return;

    let center = 0;
    let current = 0;
    let frame = 0;
    let running = false;
    let resizeTimer = 0;

    const measure = () => {
      const bounds = element.getBoundingClientRect();
      center = bounds.top + window.scrollY + bounds.height / 2;
    };

    const render = () => {
      const target = (window.scrollY + window.innerHeight / 2 - center) * speed;
      current += (target - current) * 0.1;
      element.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      if (Math.abs(target - current) > 0.1) {
        frame = window.requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const onScroll = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 150);
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      element.style.transform = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("scroll-drift", className)}>
      {children}
    </div>
  );
}
