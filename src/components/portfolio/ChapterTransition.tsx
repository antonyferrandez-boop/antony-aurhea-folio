import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ChapterTransition({ label }: { label: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          end: "bottom 18%",
          scrub: 0.72,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".chapter-bridge-lockup",
          { autoAlpha: 0, yPercent: 24, scale: 0.82 },
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.34, ease: "power3.out" },
        )
        .fromTo(
          ".chapter-bridge-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.3, ease: "power3.out" },
          "-=0.22",
        )
        .to(
          ".chapter-bridge-lockup",
          {
            autoAlpha: 0,
            scale: () => (window.innerWidth < 768 ? 1.7 : 3.25),
            yPercent: -12,
            duration: 0.5,
            ease: "power3.in",
          },
          "+=0.08",
        )
        .fromTo(
          ".chapter-bridge-curtain",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.52, ease: "power3.inOut" },
          "-=0.42",
        )
        .fromTo(
          ".chapter-bridge-accent",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.3, ease: "power3.out" },
          "-=0.18",
        );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} className="chapter-bridge" aria-hidden="true">
      <div className="chapter-bridge-sticky">
        <div className="chapter-bridge-lockup">
          <span className="chapter-bridge-index">02</span>
          <span className="chapter-bridge-word">{label}</span>
          <span className="chapter-bridge-rule" />
        </div>
        <span className="chapter-bridge-curtain" />
        <span className="chapter-bridge-accent" />
      </div>
    </section>
  );
}
