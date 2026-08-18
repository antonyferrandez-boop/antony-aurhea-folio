import portrait from "@/assets/antony-portrait.png.asset.json";
import type { Copy } from "@/content/copy";
import { Container, ArrowLink } from "./primitives";

export function Hero({ t }: { t: Copy }) {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
      <Container>
        <div className="flex items-center justify-between">
          <span className="meta text-primary">{t.hero.tag}</span>
          <span className="meta text-muted-foreground">{t.hero.place}</span>
        </div>

        <div className="relative mt-8 lg:mt-10">
          <h1 className="sr-only">
            Antony Rodrigues — {t.hero.headline} {t.hero.headlineAccent}
          </h1>

          <div aria-hidden="true" className="display text-foreground/70">
            <span className="block text-[19vw] leading-[0.82] sm:text-[15vw] lg:text-[11.5vw]">
              ANTONY
            </span>
          </div>

          <div className="relative -mt-3 lg:-mt-[6vw] lg:pl-[24%]">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden sm:aspect-[5/6] lg:mx-0 lg:max-w-[38rem]">
              <img
                src={portrait.url}
                alt={t.hero.portraitAlt}
                width={638}
                height={630}
                loading="eager"
                decoding="async"
                className="portrait-mask size-full object-cover object-[52%_22%] sm:object-[50%_25%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40"
              />
            </div>

            <div
              aria-hidden="true"
              className="display pointer-events-none -mt-6 text-right text-foreground/75 lg:absolute lg:right-[-4vw] lg:bottom-[16%] lg:mt-0"
            >
              <span className="block text-[16vw] leading-[0.82] sm:text-[13vw] lg:text-[10.5vw]">
                RODRIGUES
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-primary"
              />
              <span className="meta text-foreground">{t.hero.status}</span>
            </p>
            <ul className="meta mt-6 space-y-1 text-muted-foreground">
              {t.hero.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <p className="display text-3xl text-foreground sm:text-4xl lg:text-5xl">
              {t.hero.headline}
            </p>
            <p className="editorial mt-1 text-3xl text-primary sm:text-4xl lg:text-5xl">
              {t.hero.headlineAccent}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-3">
            <ArrowLink href="#work" variant="solid" icon="right">
              {t.hero.ctaWork}
            </ArrowLink>
            <ArrowLink href="#contact" icon="up-right">
              {t.hero.ctaContact}
            </ArrowLink>
            <a
              href="#manifesto"
              className="meta mt-2 inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              {t.hero.explore}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}