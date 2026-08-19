import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PageMotion({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-motion-title]").forEach((title) => {
          gsap.fromTo(
            title,
            {
              autoAlpha: 0.28,
              yPercent: 24,
              scale: 0.86,
              letterSpacing: "0.025em",
              transformOrigin: "left bottom",
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              scale: 1,
              letterSpacing: "-0.045em",
              ease: "none",
              scrollTrigger: {
                trigger: title,
                start: "top 96%",
                end: "top 48%",
                scrub: 0.95,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-motion-screen]").forEach((screen) => {
          gsap.fromTo(
            screen,
            { autoAlpha: 0.36, y: 96, scale: 0.91, clipPath: "inset(7% 4% 0 4%)" },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: screen,
                start: "top 97%",
                end: "top 52%",
                scrub: 1.05,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-motion-line]").forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 90%",
                end: "top 58%",
                scrub: 0.5,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-motion-parallax]").forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      });

      media.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-section-wipe]").forEach((wipe) => {
          const chapter = wipe.closest<HTMLElement>("[data-motion-chapter]");
          if (!chapter) return;
          gsap.fromTo(
            wipe,
            { clipPath: "inset(0% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 100% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top 98%",
                end: "top 58%",
                scrub: 1.15,
              },
            },
          );
        });
      });

      return () => media.revert();
    });

    void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => context.revert();
  }, [locale]);

  return null;
}
