import type { Copy } from "@/content/copy";
import { ArrowLink, Container } from "./primitives";

export function Hero({ t }: { t: Copy }) {
  return (
    <section
      id="top"
      className="hero-stage relative isolate overflow-hidden bg-[#08090c] pt-24 sm:pt-28 lg:min-h-[48rem] lg:pt-32"
    >
      <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
      <Container className="relative">
        <div className="hero-grid relative min-h-[39rem] pb-10 sm:min-h-[45rem] lg:min-h-[41rem] lg:pb-16">
          <div className="relative z-10 pt-6 lg:pt-14">
            <p className="meta max-w-[20rem] text-primary-highlight">{t.hero.eyebrow}</p>
            <h1 className="mt-7 max-w-[44rem]">
              <span className="hero-name hero-name-first block">ANTONY</span>
              <span className="hero-name hero-name-last block">Rodrigues</span>
            </h1>
          </div>

          <div className="hero-copy relative z-20 pb-4 lg:pb-2">
            <p className="max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
              {t.hero.headline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ArrowLink href="#work" variant="solid" icon="right">
                {t.hero.ctaWork}
              </ArrowLink>
              <ArrowLink
                href="#contact"
                className="border-white/20 text-white hover:border-primary hover:bg-white/5"
              >
                {t.hero.ctaContact}
              </ArrowLink>
            </div>
            <p className="meta mt-8 text-white/42">{t.hero.availability}</p>
          </div>

          <div className="hero-portrait-wrap pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto max-w-[52rem] lg:right-[-8%] lg:left-auto lg:mx-0 lg:w-[53%]">
            <img
              src="/images/antony-portrait-dark.png"
              alt={t.hero.portraitAlt}
              width={1262}
              height={1246}
              loading="eager"
              decoding="async"
              className="hero-portrait block w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
