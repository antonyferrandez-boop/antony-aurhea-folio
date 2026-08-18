import { useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Copy, Lang } from "@/content/copy";
import { projects } from "@/content/projects";
import { links } from "@/lib/links";
import { ArrowLink, Container } from "./primitives";
import { CinematicCase } from "./CinematicCase";
import { ProjectScreen } from "./ProjectScreen";
import { Reveal } from "./Reveal";
import { ScrollDrift } from "./ScrollDrift";

function Eyebrow({ children }: { children: string }) {
  return <p className="section-eyebrow">{children}</p>;
}

function setSpotlight(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
}

export function Manifesto({ t }: { t: Copy }) {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-[#11151c] py-24 sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="manifesto-shape" />
      <Container className="relative">
        <Eyebrow>{t.manifesto.eyebrow}</Eyebrow>
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <h2 className="display max-w-5xl text-[12vw] leading-[0.86] text-foreground sm:text-7xl lg:text-[6.25rem]">
              {t.manifesto.title}
            </h2>
          </Reveal>
          <Reveal delay={90} className="self-end lg:col-span-4 lg:pb-2">
            <p className="editorial text-3xl leading-[1.04] text-primary sm:text-4xl">
              {t.manifesto.accent}
            </p>
          </Reveal>
        </div>
        <Reveal delay={130} className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <p className="max-w-2xl text-lg leading-relaxed text-white/66 sm:text-xl lg:col-span-6">
            {t.manifesto.body}
          </p>
          <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-6 lg:self-end">
            {t.manifesto.notes.map((note, index) => (
              <li key={note} className="manifesto-note">
                <span className="font-editorial text-primary">0{index + 1}</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

export function Proof({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const item = t.proof.items[active];
  const show = (direction: number) =>
    setActive((current) => (current + direction + t.proof.items.length) % t.proof.items.length);

  return (
    <section className="bg-background py-24 sm:py-32 lg:py-40">
      <Container>
        <Eyebrow>{t.proof.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="display max-w-3xl text-5xl leading-[0.88] text-foreground sm:text-6xl lg:col-span-8 lg:text-7xl">
            {t.proof.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-4">
            {t.proof.intro}
          </p>
        </div>

        <div className="proof-deck mt-14 grid overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
          <div className="proof-content">
            <p className="meta text-primary">{item.k}</p>
            <div key={item.k} className="proof-slide max-w-xl" aria-live="polite">
              <p className="display text-5xl leading-[0.9] text-foreground sm:text-6xl">{item.v}</p>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                {item.d}
              </p>
            </div>
            <div className="proof-footer">
              <div className="proof-count-wrap">
                <span className="meta text-white/35">
                  0{active + 1} / 0{t.proof.items.length}
                </span>
                <span className="proof-progress" aria-hidden="true">
                  <span style={{ transform: `scaleX(${(active + 1) / t.proof.items.length})` }} />
                </span>
              </div>
              <div className="proof-nav">
                <button
                  type="button"
                  onClick={() => show(-1)}
                  aria-label={t.proof.previous}
                  className="circle-control"
                >
                  <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => show(1)}
                  aria-label={t.proof.next}
                  className="circle-control"
                >
                  <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
          <div className="proof-picker-rail">
            {t.proof.items.map((proof, index) => (
              <button
                key={proof.k}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`proof-picker ${active === index ? "is-active" : ""}`}
              >
                <span className="meta text-primary">0{index + 1}</span>
                <span className="display mt-3 text-2xl text-foreground">{proof.k}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {proof.v}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Systems({ t }: { t: Copy }) {
  return (
    <section
      id="systems"
      className="case-chapter overflow-hidden bg-[#0b0d11] py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <Eyebrow>{t.systems.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <h2 className="display max-w-4xl text-5xl leading-[0.88] text-foreground sm:text-6xl lg:col-span-8 lg:text-7xl">
            {t.systems.title}
          </h2>
          <p className="self-end text-base leading-relaxed text-muted-foreground lg:col-span-4">
            {t.systems.intro}
          </p>
        </div>

        <CinematicCase className="mt-16">
          <div className="case-cinematic-stage">
            <span aria-hidden="true" className="case-cinematic-orbit" />
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="case-cinematic-visual relative lg:col-span-7">
                <div className="case-preview group relative overflow-hidden rounded-[1.35rem] bg-[#20160e] p-3 sm:p-5">
                  <img
                    src="/images/porco-morto-preview.png"
                    alt="Prévia do projeto Porco Morto"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full rounded-[0.85rem] object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
                  />
                  <div className="case-preview-caption">
                    <span>{t.systems.caseTitle}</span>
                    <span>{t.systems.caseSub}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 lg:pt-8">
                <ol className="case-flow case-cinematic-flow">
                  {t.systems.flow.map((step, index) => (
                    <li key={step}>
                      <span className="case-flow-index">0{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <ArrowLink
                  href="https://porcomorto.lovable.app/"
                  external
                  className="case-cinematic-action mt-10"
                >
                  {t.systems.visit}
                </ArrowLink>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {t.systems.pillars.map((pillar) => (
                <div key={pillar.t} className="case-pillar case-cinematic-pillar">
                  <p className="meta text-primary">{pillar.t}</p>
                  <p className="mt-5 text-sm leading-relaxed text-white/62">{pillar.d}</p>
                </div>
              ))}
            </div>
          </div>
        </CinematicCase>
      </Container>
    </section>
  );
}

export function Work({ t, lang }: { t: Copy; lang: Lang }) {
  const initialProject = Math.max(
    0,
    projects.findIndex((project) => project.id === "porco-morto"),
  );
  const [activeIndex, setActiveIndex] = useState(initialProject);
  const project = projects[activeIndex]!;
  const changeProject = (direction: number) =>
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);

  return (
    <section
      id="work"
      className="project-chapter overflow-hidden bg-background py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <Eyebrow>{t.work.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display max-w-4xl text-5xl leading-[0.88] text-foreground sm:text-6xl lg:col-span-8 lg:text-7xl">
            {t.work.title}
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground lg:col-span-4">
            {t.work.intro}
          </p>
        </div>

        <div className="project-stage mt-14 grid gap-7 p-3 sm:p-5 lg:grid-cols-12 lg:gap-10 lg:p-7">
          <ProjectScreen className="lg:col-span-8" motionKey={project.id}>
            <img
              key={project.id}
              src={project.image}
              alt={`Prévia do projeto ${project.title}`}
              loading={activeIndex === initialProject ? "eager" : "lazy"}
              decoding="async"
              className="project-screen-media project-stage-image h-full w-full object-contain"
            />
            <span className="project-stage-index">{project.index}</span>
          </ProjectScreen>
          <div className="flex min-h-[19rem] flex-col justify-between p-3 sm:p-5 lg:col-span-4 lg:min-h-[33rem] lg:p-6">
            <div>
              <p className="meta text-primary">
                {t.work.project} · {project.year}
              </p>
              <h3 className="display mt-4 text-5xl leading-[0.88] text-foreground sm:text-6xl">
                {project.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {project.description[lang]}
              </p>
              <ul className="project-categories" aria-label={t.work.categories}>
                {project.categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              <div className="mt-7">
                <p className="meta text-white/40">{t.work.role}</p>
                <p className="mt-2 text-sm text-white/78">{project.role.join(" · ")}</p>
              </div>
              {project.status && <p className="meta mt-6 text-primary">{project.status[lang]}</p>}
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <ArrowLink href={project.liveUrl} external variant="solid">
                  {t.work.view}
                </ArrowLink>
              )}
              <button
                type="button"
                onClick={() => changeProject(-1)}
                aria-label={t.work.previous}
                className="circle-control"
              >
                <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => changeProject(1)}
                aria-label={t.work.next}
                className="circle-control"
              >
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="project-rail mt-6" role="tablist" aria-label={t.work.eyebrow}>
          {projects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`project-thumb ${activeIndex === index ? "is-active" : ""}`}
            >
              <span className="project-thumb-image">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="meta">{item.title}</span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Timeline({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const step = t.timeline.steps[active];

  return (
    <section
      id="profile"
      className="trajectory-chapter bg-[#e8ecf2] py-24 text-[#10141a] sm:py-32 lg:py-40"
    >
      <Container>
        <Eyebrow>{t.timeline.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display max-w-4xl text-5xl leading-[0.88] sm:text-6xl lg:col-span-8 lg:text-7xl">
            {t.timeline.title}
          </h2>
          <p className="text-base leading-relaxed text-[#4b5563] lg:col-span-4">
            {t.timeline.intro}
          </p>
        </div>

        <ScrollDrift className="mt-16" speed={0.035}>
          <div className="trajectory-board grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:p-10">
            <div className="lg:col-span-5">
              <p className="meta text-[#5c7391]">
                0{active + 1} / 0{t.timeline.steps.length}
              </p>
              <Reveal key={step.k} className="mt-8">
                <h3 className="display text-5xl leading-[0.9] sm:text-6xl">{step.k}</h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#4b5563] sm:text-lg">
                  {step.v}
                </p>
              </Reveal>
            </div>
            <ol className="trajectory-list lg:col-span-7" aria-label={t.timeline.eyebrow}>
              {t.timeline.steps.map((item, index) => (
                <li key={item.k}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={active === index}
                    className={active === index ? "is-active" : ""}
                  >
                    <span className="trajectory-dot" aria-hidden="true" />
                    <span className="meta">0{index + 1}</span>
                    <span>{item.k}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </ScrollDrift>
      </Container>
    </section>
  );
}

export function Story({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const step = t.story.process[active];

  return (
    <section className="bg-background py-24 sm:py-32 lg:py-40">
      <Container>
        <Eyebrow>{t.story.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <h2 className="display max-w-4xl text-5xl leading-[0.88] text-foreground sm:text-6xl lg:col-span-8 lg:text-7xl">
            {t.story.title}
          </h2>
          <p className="self-end text-base leading-relaxed text-muted-foreground lg:col-span-4">
            {t.story.body}
          </p>
        </div>

        <div className="method-stage mt-16 grid overflow-hidden lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-5 lg:p-12">
            <p className="font-editorial text-5xl text-primary sm:text-6xl">{step.n}</p>
            <Reveal key={step.n} className="mt-12">
              <h3 className="display text-5xl leading-[0.9] text-foreground sm:text-6xl">
                {step.t}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                {step.d}
              </p>
            </Reveal>
          </div>
          <div className="grid bg-white/[0.035] sm:grid-cols-2 lg:col-span-7">
            {t.story.process.map((item, index) => (
              <button
                key={item.n}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`method-choice ${active === index ? "is-active" : ""}`}
              >
                <span className="meta text-primary">{item.n}</span>
                <span className="display mt-8 text-3xl leading-[0.9] text-foreground">
                  {item.t}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.5}
                  className="mt-8 text-white/45"
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Services({ t }: { t: Copy }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="services-chapter bg-[#0d1219] py-24 sm:py-32 lg:py-40">
      <Container>
        <Eyebrow>{t.services.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display max-w-4xl text-5xl leading-[0.88] text-foreground sm:text-6xl lg:col-span-9 lg:text-7xl">
            {t.services.title}
          </h2>
        </div>
        <div className="service-accordion mt-16">
          {t.services.groups.map((group, index) => {
            const isOpen = open === index;
            return (
              <div key={group.t} className={isOpen ? "is-open" : ""}>
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-expanded={isOpen}
                  className="service-trigger"
                >
                  <span className="font-editorial text-primary">0{index + 1}</span>
                  <span className="display text-4xl text-foreground sm:text-5xl">{group.t}</span>
                  {isOpen ? (
                    <Minus aria-hidden="true" size={22} strokeWidth={1.5} />
                  ) : (
                    <Plus aria-hidden="true" size={22} strokeWidth={1.5} />
                  )}
                </button>
                <div className="service-panel" aria-hidden={!isOpen}>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
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
    <section id="contact" className="contact-chapter bg-background py-24 sm:py-32 lg:py-40">
      <Container>
        <Eyebrow>{t.contact.eyebrow}</Eyebrow>
        <h2 className="mt-10 max-w-6xl text-[12vw] leading-[0.82] sm:text-7xl lg:text-[6.4rem]">
          <span className="display block text-foreground">{t.contact.title1}</span>
          <span className="display block text-foreground">{t.contact.title2}</span>
          <span className="editorial mt-5 block text-primary">{t.contact.accent}</span>
        </h2>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <a
            href={links.emailHref}
            onPointerMove={setSpotlight}
            className="contact-card contact-card-light"
          >
            <span className="meta text-[#60738c]">{t.contact.careerTitle}</span>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3f4b59]">
              {t.contact.careerText}
            </p>
            <span className="contact-card-action">
              {t.contact.email}
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
            </span>
          </a>
          <a
            href={links.whatsapp(lang)}
            target="_blank"
            rel="noopener noreferrer"
            onPointerMove={setSpotlight}
            className="contact-card contact-card-dark"
          >
            <span className="meta text-primary">{t.contact.projectTitle}</span>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/68">
              {t.contact.projectText}
            </p>
            <span className="contact-card-action">
              {t.contact.whatsapp}
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
            </span>
          </a>
        </div>

        <div className="mt-20 grid gap-7 lg:grid-cols-12">
          <p className="meta text-muted-foreground lg:col-span-3">{t.contact.channels}</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.k}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onPointerMove={setSpotlight}
                  className="channel-link"
                >
                  <span className="meta text-foreground">{channel.k}</span>
                  <span className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    {channel.v}
                    <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function Footer({ t }: { t: Copy }) {
  return (
    <footer className="bg-[#08090c] py-12 text-white sm:py-16">
      <Container className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-4xl">
            ANTONY <span className="font-editorial text-primary normal-case">Rodrigues</span>
          </p>
          <p className="mt-3 text-sm text-white/55">{t.footer.role}</p>
          <p className="meta mt-2 text-white/35">{t.footer.place}</p>
        </div>
        <div className="sm:text-right">
          <p className="meta text-white/35">© 2026 · {t.footer.rights}</p>
          <a href="#top" className="footer-top-link">
            {t.footer.top}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
