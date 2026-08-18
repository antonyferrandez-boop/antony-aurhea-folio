import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ChapterTransition() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".chapter-transition-panel",
        { yPercent: 101 },
        {
          yPercent: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom 32%",
            scrub: 0.7,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="chapter-transition" aria-hidden="true">
      <span className="chapter-transition-panel chapter-transition-shadow" />
      <span className="chapter-transition-panel chapter-transition-accent" />
      <span className="chapter-transition-panel chapter-transition-light" />
    </div>
  );
}
