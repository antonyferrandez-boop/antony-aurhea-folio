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
          ".hero-field",
          { autoAlpha: 0, scale: 1.035 },
          { autoAlpha: 1, scale: 1, duration: 1.35, ease: "expo.out" },
        )
        .fromTo(
          ".hero-name-first",
          { autoAlpha: 0, yPercent: 48 },
          { autoAlpha: 1, yPercent: 0, duration: 1.08 },
          "-=0.78",
        )
        .fromTo(
          ".hero-name-last",
          { autoAlpha: 0, xPercent: -7, yPercent: 30 },
          { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 1.12, ease: "expo.out" },
          "-=0.84",
        )
        .fromTo(
          ".hero-bottom > *",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.82, stagger: 0.09 },
          "-=0.48",
        )
        .fromTo(
          ".hero-scroll-cue",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 0.72, y: 0, duration: 0.72 },
          "-=0.32",
        );

      media.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            ".hero-field",
            { scale: 1.12, xPercent: -1.5, transformOrigin: "66% 52%", ease: "none" },
            0,
          )
          .to(
            ".hero-name-lockup",
            { scale: 0.76, xPercent: -5, yPercent: -22, autoAlpha: 0.14, ease: "none" },
            0,
          )
          .to(".hero-bottom", { yPercent: -34, autoAlpha: 0, ease: "none" }, 0.08)
          .to(".hero-scroll-cue", { autoAlpha: 0, y: -14, ease: "none" }, 0.04)
          .to(".hero-exit-shade", { autoAlpha: 0.82, ease: "none" }, 0.34);
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
          <span className="hero-exit-shade" aria-hidden="true" />
        </div>

        <Container className="hero-content">
          <div className="hero-grid">
            <div className="hero-heading">
              <h1 className="hero-name-lockup" aria-label="Antony Rodrigues">
                <span className="hero-name hero-name-first block">ANTONY</span>
                <span className="hero-name hero-name-last block">Rodrigues</span>
              </h1>
            </div>

            <div className="hero-bottom">
              <p className="hero-statement">{t.hero.headline}</p>
              <div className="hero-cta-row">
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
              <p className="meta hero-availability">{t.hero.availability}</p>
            </div>

            <div aria-hidden="true" className="hero-scroll-cue">
              <span>{t.hero.scroll}</span>
              <i />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
