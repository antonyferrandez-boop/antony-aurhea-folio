import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Copy } from "@/content/copy";
import { ArrowLink, Container } from "./primitives";

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
          ".hero-media-depth",
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1.025, duration: 1.35, ease: "expo.out" },
        )
        .fromTo(
          ".hero-eyebrow",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.8",
        )
        .fromTo(
          ".hero-name-first",
          { autoAlpha: 0, yPercent: 40, rotate: 1.5 },
          { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.1 },
          "-=0.55",
        )
        .fromTo(
          ".hero-name-last",
          { autoAlpha: 0, xPercent: -9, yPercent: 18 },
          { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 1.05, ease: "expo.out" },
          "-=0.82",
        )
        .fromTo(
          ".hero-copy",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.85 },
          "-=0.46",
        )
        .fromTo(
          ".hero-scroll-cue",
          { autoAlpha: 0, y: 9 },
          { autoAlpha: 0.72, y: 0, duration: 0.65 },
          "-=0.25",
        );

      media.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(".hero-media-depth", { yPercent: -3.5, scale: 1.095, ease: "none" }, 0)
          .to(".hero-curtain-left", { scaleX: 0.08, ease: "none" }, 0)
          .to(".hero-curtain-right", { scaleX: 0.08, ease: "none" }, 0)
          .to(".hero-frame", { autoAlpha: 0, scale: 1.02, ease: "none" }, 0)
          .to(".hero-name-first", { yPercent: -16, autoAlpha: 0.42, ease: "none" }, 0)
          .to(".hero-name-last", { yPercent: -9, xPercent: 5, autoAlpha: 0.18, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: 20, autoAlpha: 0, ease: "none" }, 0.08)
          .to(".hero-scroll-cue", { autoAlpha: 0, ease: "none" }, 0.08);
      });

      media.add("(min-width: 1100px) and (hover: hover) and (pointer: fine)", () => {
        const depth = root.querySelector<HTMLElement>(".hero-media-depth");
        if (!depth) return;

        const xTo = gsap.quickTo(depth, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(depth, "y", { duration: 0.8, ease: "power3.out" });

        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
          const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
          xTo(horizontal * -12);
          yTo(vertical * -8);
        };

        const onPointerLeave = () => {
          xTo(0);
          yTo(0);
        };

        root.addEventListener("pointermove", onPointerMove);
        root.addEventListener("pointerleave", onPointerLeave);

        return () => {
          root.removeEventListener("pointermove", onPointerMove);
          root.removeEventListener("pointerleave", onPointerLeave);
        };
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="hero-stage relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-media-shell">
        <div className="hero-media-depth">
          <img
            src="/images/antony-hero-studio.webp"
            alt=""
            width={2048}
            height={942}
            loading="eager"
            decoding="async"
            className="hero-media"
          />
        </div>
        <div className="hero-media-vignette" />
        <span className="hero-curtain hero-curtain-left" />
        <span className="hero-curtain hero-curtain-right" />
        <span className="hero-frame" />
      </div>

      <Container className="relative z-10">
        <div className="hero-grid min-h-[calc(100svh-4rem)] pt-24 pb-8 sm:min-h-[calc(100svh-5rem)] sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-14">
          <div className="hero-heading pt-5 lg:pt-10">
            <p className="hero-eyebrow meta max-w-[21rem] text-primary-highlight">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-7 max-w-[49rem]" aria-label="Antony Rodrigues">
              <span className="hero-name hero-name-first block">ANTONY</span>
              <span className="hero-name hero-name-last block">Rodrigues</span>
            </h1>
          </div>

          <div className="hero-copy max-w-[27rem]">
            <div className="hero-copy-panel">
              <p className="text-base leading-relaxed text-white/82 sm:text-lg">
                {t.hero.headline}
              </p>
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
              <p className="meta mt-6 text-white/50">{t.hero.availability}</p>
            </div>
          </div>

          <div aria-hidden="true" className="hero-scroll-cue">
            <span>SCROLL</span>
            <i />
          </div>
        </div>
      </Container>
    </section>
  );
}
