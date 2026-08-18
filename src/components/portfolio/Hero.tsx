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
        .fromTo(".hero-eyebrow", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.85 })
        .fromTo(
          ".hero-name-first",
          { autoAlpha: 0, yPercent: 34, rotate: 1.5 },
          { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.15 },
          "-=0.44",
        )
        .fromTo(
          ".hero-name-last",
          { autoAlpha: 0, xPercent: -10, yPercent: 20 },
          { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 1.1, ease: "expo.out" },
          "-=0.86",
        )
        .fromTo(
          ".hero-portrait-wrap",
          { autoAlpha: 0, y: 70, scale: 1.045 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.25, ease: "expo.out" },
          "<",
        )
        .fromTo(
          ".hero-copy",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "-=0.48",
        )
        .fromTo(
          ".hero-scroll-cue",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 0.75, y: 0, duration: 0.7 },
          "-=0.24",
        );

      media.add("(min-width: 900px)", () => {
        const depth = root.querySelector<HTMLElement>(".hero-portrait-depth");
        const portrait = root.querySelector<HTMLElement>(".hero-portrait-wrap");
        if (!depth || !portrait) return;

        const xTo = gsap.quickTo(depth, "x", { duration: 0.85, ease: "power3.out" });
        const yTo = gsap.quickTo(depth, "y", { duration: 0.85, ease: "power3.out" });
        const rotateTo = gsap.quickTo(depth, "rotationY", { duration: 0.85, ease: "power3.out" });
        const liftTo = gsap.quickTo(depth, "rotationX", { duration: 0.85, ease: "power3.out" });

        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
          const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
          xTo(horizontal * 18);
          yTo(vertical * 12);
          rotateTo(horizontal * -4.2);
          liftTo(vertical * 2.8);
        };

        const onPointerLeave = () => {
          xTo(0);
          yTo(0);
          rotateTo(0);
          liftTo(0);
        };

        root.addEventListener("pointermove", onPointerMove);
        root.addEventListener("pointerleave", onPointerLeave);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(portrait, { yPercent: -11, scale: 1.065, ease: "none" }, 0)
          .to(".hero-name-first", { yPercent: -15, autoAlpha: 0.55, ease: "none" }, 0)
          .to(".hero-name-last", { yPercent: -8, xPercent: 6, autoAlpha: 0.2, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: 22, autoAlpha: 0, ease: "none" }, 0.08)
          .to(".hero-scroll-cue", { autoAlpha: 0, ease: "none" }, 0.08)
          .to(".hero-orbit-one", { rotate: -102, xPercent: -14, ease: "none" }, 0)
          .to(".hero-orbit-two", { rotate: 118, xPercent: 10, ease: "none" }, 0);

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
    <section
      ref={rootRef}
      id="top"
      className="hero-stage relative isolate overflow-hidden bg-[#08090b] pt-24 sm:pt-28 lg:min-h-[54rem] lg:pt-32"
    >
      <div aria-hidden="true" className="hero-sheen" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
      <Container className="relative">
        <div className="hero-grid relative min-h-[43rem] pb-10 sm:min-h-[48rem] lg:min-h-[47rem] lg:pb-16">
          <div className="relative z-10 pt-6 lg:pt-14">
            <p className="hero-eyebrow meta max-w-[20rem] text-primary-highlight">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-7 max-w-[44rem]">
              <span className="hero-name hero-name-first block">ANTONY</span>
              <span className="hero-name hero-name-last block">Rodrigues</span>
            </h1>
          </div>

          <div className="hero-copy relative z-20 max-w-md pb-4 lg:pb-2">
            <div className="hero-copy-panel">
              <p className="text-base leading-relaxed text-white/78 sm:text-lg">
                {t.hero.headline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
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
              <p className="meta mt-7 text-white/48">{t.hero.availability}</p>
            </div>
          </div>

          <div className="hero-portrait-wrap pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto max-w-[52rem] lg:right-[-8%] lg:left-auto lg:mx-0 lg:w-[53%]">
            <div className="hero-portrait-depth">
              <img
                src="/images/antony-portrait-cutout.png"
                alt={t.hero.portraitAlt}
                width={1262}
                height={1246}
                loading="eager"
                decoding="async"
                className="hero-portrait block w-full"
              />
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
