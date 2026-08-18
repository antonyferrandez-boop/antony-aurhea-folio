import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type CinematicCaseProps = {
  children: ReactNode;
  className?: string;
};

export function CinematicCase({ children, className }: CinematicCaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 900px)", () => {
        const stage = root.querySelector<HTMLElement>(".case-cinematic-stage");
        if (!stage) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top+=80",
            end: () => `+=${Math.round(window.innerHeight * 1.05)}`,
            pin: stage,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            ".case-cinematic-visual",
            { autoAlpha: 0, xPercent: 10, yPercent: 8, scale: 0.94, rotate: 1.25 },
            {
              autoAlpha: 1,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotate: 0,
              duration: 1,
              ease: "power3.out",
            },
          )
          .fromTo(
            ".case-cinematic-flow li",
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
            "-=0.55",
          )
          .fromTo(
            ".case-cinematic-action",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" },
            "-=0.25",
          )
          .fromTo(
            ".case-cinematic-pillar",
            { autoAlpha: 0, y: 34 },
            { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.2, ease: "power3.out" },
            "-=0.32",
          )
          .to(".case-signal", { xPercent: -9, autoAlpha: 0.72, ease: "none" }, 0);
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className={cn("case-cinematic", className)}>
      {children}
    </div>
  );
}
