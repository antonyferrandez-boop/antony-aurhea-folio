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
            { yPercent: 14, scale: 0.93, transformOrigin: "left bottom" },
            {
              yPercent: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: title,
                start: "top 92%",
                end: "top 46%",
                scrub: 0.55,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-motion-screen]").forEach((screen) => {
          gsap.fromTo(
            screen,
            { y: 72, scale: 0.94 },
            {
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: screen,
                start: "top 94%",
                end: "top 54%",
                scrub: 0.65,
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

      return () => media.revert();
    });

    void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => context.revert();
  }, [locale]);

  return null;
}
