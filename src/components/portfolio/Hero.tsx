import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Copy } from "@/content/copy";
import { ArrowLink, Container } from "./primitives";
import { HeroField } from "./HeroField";

export function Hero({ t }: { t: Copy }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

      entrance
        .fromTo(
          ".hero-field-shell",
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 1.2, ease: "expo.out" },
        )
        .fromTo(
          ".hero-name-first",
          { autoAlpha: 0, yPercent: 44 },
          { autoAlpha: 1, yPercent: 0, duration: 1.05 },
          "-=0.66",
        )
        .fromTo(
          ".hero-name-last",
          { autoAlpha: 0, xPercent: -9, yPercent: 22 },
          { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 1.08, ease: "expo.out" },
          "-=0.78",
        )
        .fromTo(
          ".hero-copy",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.82 },
          "-=0.45",
        )
        .fromTo(
          ".hero-scroll-cue",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 0.7, y: 0, duration: 0.6 },
          "-=0.22",
        );

      media.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            ".hero-field-shell",
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              scale: 1.075,
              ease: "none",
            },
            0,
          )
          .to(".hero-name-first", { xPercent: -8, yPercent: -22, autoAlpha: 0.16, ease: "none" }, 0)
          .to(".hero-name-last", { xPercent: 14, yPercent: 18, autoAlpha: 0, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -28, autoAlpha: 0, ease: "none" }, 0.08)
          .to(".hero-scroll-cue", { autoAlpha: 0, ease: "none" }, 0.05)
          .to(".hero-field-fade", { autoAlpha: 0.1, ease: "none" }, 0.2);
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="hero-stage">
      <div className="hero-sticky">
        <div className="hero-field-shell">
          <HeroField />
          <span className="hero-field-fade" aria-hidden="true" />
        </div>

        <Container className="hero-content">
          <div className="hero-grid">
            <div className="hero-heading">
              <h1 aria-label="Antony Rodrigues">
                <span className="hero-name hero-name-first block">ANTONY</span>
                <span className="hero-name hero-name-last block">Rodrigues</span>
              </h1>
            </div>

            <div className="hero-copy">
              <p className="hero-statement">{t.hero.headline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ArrowLink
                  href="#work"
                  variant="bare"
                  icon="right"
                  className="hero-action hero-action-primary"
                >
                  {t.hero.ctaWork}
                </ArrowLink>
                <ArrowLink href="#contact" variant="bare" className="hero-action hero-action-glass">
                  {t.hero.ctaContact}
                </ArrowLink>
              </div>
              <p className="meta mt-5 text-white/44">{t.hero.availability}</p>
            </div>

            <div aria-hidden="true" className="hero-scroll-cue">
              <span>SCROLL</span>
              <i />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
