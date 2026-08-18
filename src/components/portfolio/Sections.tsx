import type { Copy, Lang } from "@/content/copy";
import { projects } from "@/content/projects";
import { links } from "@/lib/links";
import { Container, SectionLabel, ArrowLink } from "./primitives";
import { Reveal } from "./Reveal";

export function Marquee({ t }: { t: Copy }) {
  const items = [...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-border bg-surface/60 py-4">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="meta flex items-center gap-10 text-muted-foreground"
          >
            {item}
            <span className="text-primary">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Manifesto({ t }: { t: Copy }) {
  return (
    <section id="manifesto" className="py-24 lg:py-40">
      <Container>
        <SectionLabel>{t.manifesto.label}</SectionLabel>
        <Reveal as="div" className="mt-12 lg:mt-20">
          <h2 className="display text-[13vw] leading-[0.88] sm:text-[9vw] lg:text-[6.5vw]">
            <span className="block text-foreground">{t.manifesto.line1}</span>
            <span className="block text-foreground">{t.manifesto.line2}</span>
            <span className="editorial mt-3 block text-primary lowercase">
              {t.manifesto.accent}
            </span>
          </h2>
        </Reveal>
        <Reveal className="mt-14 max-w-2xl lg:mt-24 lg:pl-[40%]">
          <p className="text-lg text-muted-foreground sm:text-xl">{t.manifesto.quote}</p>
        </Reveal>
      </Container>
    </section>
  );
}

export function Proof({ t }: { t: Copy }) {
  return (
    <section className="border-t border-border py-20 lg:py-28">
      <Container>
        <SectionLabel>{t.proof.label}</SectionLabel>
        <h2 className="display mt-8 text-4xl text-foreground sm:text-5xl lg:text-6xl">
          {t.proof.title}
        </h2>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {t.proof.items.map((item, i) => (
            <Reveal key={item.k} delay={i * 70} className="bg-background p-6 lg:p-8">
              <p className="meta text-primary">{item.k}</p>
              <p className="display mt-4 text-2xl text-foreground">{item.v}</p>
              <p className="mt-3 text-sm text-muted-foreground">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Systems({ t }: { t: Copy }) {
  return (
    <section id="systems" className="border-t border-border py-24 lg:py-32">
      <Container>
        <SectionLabel>{t.systems.label}</SectionLabel>
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <h2 className="display text-4xl text-foreground sm:text-5xl lg:col-span-6 lg:text-6xl">
            {t.systems.title}
          </h2>
          <p className="text-muted-foreground lg:col-span-5 lg:col-start-8">{t.systems.intro}</p>
        </div>

        <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-12">
          <div className="bg-background p-6 lg:col-span-5 lg:p-10">
            <p className="meta text-primary">002</p>
            <h3 className="display mt-3 text-4xl text-foreground lg:text-5xl">
              {t.systems.caseTitle}
            </h3>
            <p className="meta mt-2 text-muted-foreground">{t.systems.caseSub}</p>
            <ol className="mt-8 space-y-2">
              {t.systems.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="meta w-8 text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="meta text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-7">
            {t.systems.pillars.map((p, i) => (
              <Reveal key={p.t} delay={i * 60} className="bg-background p-6 lg:p-8">
                <p className="meta text-primary">{p.t}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Work({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section id="work" className="border-t border-border py-24 lg:py-32">
      <Container>
        <SectionLabel>{t.work.label}</SectionLabel>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-5xl text-foreground sm:text-6xl lg:text-7xl">
            {t.work.title}
          </h2>
          <p className="meta text-muted-foreground">{t.work.intro}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {projects.map((p, i) => {
            const wide = p.featured || i === 4;
            return (
              <Reveal
                key={p.id}
                delay={(i % 3) * 60}
                className={wide ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article className="group flex h-full flex-col border border-border bg-surface/40 transition-colors duration-300 hover:border-border-hover">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#0b0f17] p-3 sm:p-4">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.title} — preview`}
                        loading="lazy"
                        decoding="async"
                        className="size-full border border-white/8 object-contain object-center opacity-90 shadow-2xl transition duration-700 ease-out group-hover:scale-[1.015] group-hover:opacity-100"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <span className="meta text-subtle">{t.work.soon}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="meta text-primary">{p.index}</p>
                        <h3 className="display mt-2 text-3xl text-foreground lg:text-4xl">
                          {p.title}
                        </h3>
                      </div>
                      <span className="meta text-subtle">{p.year}</span>
                    </div>
                    <p className="meta mt-4 text-muted-foreground">{p.categories.join(" · ")}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{p.description[lang]}</p>
                    {p.status && <p className="meta mt-4 text-primary">{p.status[lang]}</p>}
                    <div className="mt-8 pt-2">
                      {p.liveUrl ? (
                        <ArrowLink href={p.liveUrl} external>
                          {t.work.view}
                        </ArrowLink>
                      ) : (
                        <p className="meta text-subtle">{t.work.noLink}</p>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function Timeline({ t }: { t: Copy }) {
  return (
    <section id="profile" className="border-t border-border py-24 lg:py-32">
      <Container>
        <SectionLabel>{t.timeline.label}</SectionLabel>
        <h2 className="display mt-8 max-w-3xl text-4xl text-foreground sm:text-5xl lg:text-6xl">
          {t.timeline.title}
        </h2>
        <ol className="mt-14 border-t border-border">
          {t.timeline.steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.k}
              delay={i * 60}
              className="grid gap-2 border-b border-border py-6 sm:grid-cols-12 sm:items-baseline"
            >
              <span className="meta text-primary sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-2xl text-foreground sm:col-span-5 lg:text-3xl">
                {s.k}
              </span>
              <span className="text-sm text-muted-foreground sm:col-span-6">{s.v}</span>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Story({ t }: { t: Copy }) {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <Container>
        <SectionLabel>{t.story.label}</SectionLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <h2 className="display text-4xl text-foreground sm:text-5xl lg:col-span-6 lg:text-6xl">
            {t.story.title}
          </h2>
          <div className="space-y-5 lg:col-span-5 lg:col-start-8">
            {t.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>

        <p className="meta mt-20 text-primary">{t.story.processLabel}</p>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.story.process.map((step, i) => (
            <Reveal key={step.n} delay={i * 50} className="bg-background p-6 lg:p-8">
              <span className="meta text-subtle">{step.n}</span>
              <p className="display mt-3 text-xl text-foreground lg:text-2xl">{step.t}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Services({ t }: { t: Copy }) {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <Container>
        <SectionLabel>{t.services.label}</SectionLabel>
        <h2 className="display mt-8 text-4xl text-foreground sm:text-5xl lg:text-6xl">
          {t.services.title}
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.groups.map((g, i) => (
            <Reveal key={g.t} delay={i * 60}>
              <p className="meta border-b border-border pb-3 text-primary">{g.t}</p>
              <ul className="mt-4 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Contact({ t, lang }: { t: Copy; lang: Lang }) {
  const channels = [
    { k: t.contact.email, v: links.email, href: links.emailHref, external: false },
    { k: t.contact.whatsapp, v: links.whatsappNumber, href: links.whatsapp(lang), external: true },
    { k: t.contact.linkedin, v: "Antony Rodrigues", href: links.linkedin, external: true },
    { k: t.contact.github, v: "antonyrodrigues-dev", href: links.github, external: true },
    { k: t.contact.instagram, v: links.instagramHandle, href: links.instagram, external: true },
    { k: t.contact.aurhea, v: "aurheatec", href: links.aurhea, external: true },
  ];

  return (
    <section id="contact" className="border-t border-border py-24 lg:py-32">
      <Container>
        <SectionLabel>{t.contact.label}</SectionLabel>
        <h2 className="display mt-10 text-[12vw] leading-[0.9] sm:text-[8vw] lg:text-[6vw]">
          <span className="block text-foreground">{t.contact.title1}</span>
          <span className="block text-foreground">{t.contact.title2}</span>
          <span className="editorial mt-3 block text-primary">{t.contact.accent}</span>
        </h2>

        <div className="mt-16 grid gap-px border border-border bg-border lg:grid-cols-2">
          <div className="bg-background p-8 lg:p-10">
            <p className="meta text-primary">{t.contact.careerTitle}</p>
            <p className="mt-4 text-muted-foreground">{t.contact.careerText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ArrowLink href={links.emailHref} variant="solid" icon="right">
                {t.contact.email}
              </ArrowLink>
              <ArrowLink href={links.linkedin} external>
                {t.contact.linkedin}
              </ArrowLink>
            </div>
          </div>
          <div className="bg-background p-8 lg:p-10">
            <p className="meta text-primary">{t.contact.projectTitle}</p>
            <p className="mt-4 text-muted-foreground">{t.contact.projectText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ArrowLink href={links.whatsapp(lang)} external variant="solid">
                {t.contact.whatsapp}
              </ArrowLink>
              <ArrowLink href={links.aurhea} external>
                {t.contact.aurhea}
              </ArrowLink>
            </div>
          </div>
        </div>

        <p className="meta mt-16 text-subtle">{t.contact.channels}</p>
        <ul className="mt-4 border-t border-border">
          {channels.map((c) => (
            <li key={c.k}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-14 items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:border-border-hover"
              >
                <span className="meta text-foreground">{c.k}</span>
                <span className="flex items-center gap-3 text-sm text-muted-foreground transition-colors group-hover:text-primary">
                  {c.v}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Footer({ t }: { t: Copy }) {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-3xl text-foreground">ANTONY RODRIGUES</p>
          <p className="mt-2 text-sm text-muted-foreground">{t.footer.role}</p>
          <p className="meta mt-1 text-subtle">{t.footer.place}</p>
        </div>
        <div className="sm:text-right">
          <p className="meta text-subtle">{t.footer.signature}</p>
          <p className="meta mt-2 text-subtle">© 2026 · {t.footer.rights}</p>
          <a
            href="#top"
            className="meta mt-4 inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            {t.footer.top}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
