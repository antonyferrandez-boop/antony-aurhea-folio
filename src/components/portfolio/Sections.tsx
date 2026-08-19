import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Copy, Lang } from "@/content/copy";
import { projects } from "@/content/projects";
import { links } from "@/lib/links";
import { ArrowLink, Container } from "./primitives";
import { CinematicCase } from "./CinematicCase";
import { ProjectScreen } from "./ProjectScreen";
import { Reveal } from "./Reveal";
import { ScrollDrift } from "./ScrollDrift";
import { useAutoCycle } from "./useAutoCycle";

function Eyebrow({ children }: { children: string }) {
  return <p className="section-eyebrow">{children}</p>;
}

function SectionWipe({ tone = "dark" }: { tone?: "dark" | "light" | "blue" }) {
  return (
    <span data-section-wipe className={`section-wipe section-wipe-${tone}`} aria-hidden="true" />
  );
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
      data-motion-chapter
      className="manifesto-chapter relative overflow-hidden py-24 sm:py-32 lg:py-40"
      onPointerMove={setSpotlight}
    >
      <SectionWipe tone="dark" />
      <div aria-hidden="true" className="manifesto-shape" />
      <Container className="relative">
        <Eyebrow>{t.manifesto.eyebrow}</Eyebrow>
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <h2
              data-motion-title
              className="display max-w-5xl text-[11vw] leading-[0.88] text-[#10141a] sm:text-6xl lg:text-[5.45rem]"
            >
              {t.manifesto.title}
            </h2>
          </Reveal>
          <Reveal delay={90} className="self-end lg:col-span-4 lg:pb-2">
            <p className="editorial text-3xl leading-[1.04] text-[#247f9d] sm:text-4xl">
              {t.manifesto.accent}
            </p>
          </Reveal>
        </div>
        <Reveal delay={130} className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <p className="max-w-2xl text-lg leading-relaxed text-[#485462] sm:text-xl lg:col-span-5">
            {t.manifesto.body}
          </p>
          <div className="manifesto-principles-wrap lg:col-span-7 lg:self-end">
            <span className="manifesto-principles-rule" data-motion-line aria-hidden="true" />
            <ul className="manifesto-principles">
              {t.manifesto.notes.map((note, index) => (
                <li key={note} className="manifesto-note">
                  <span className="font-editorial">0{index + 1}</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="manifesto-kinetic" aria-hidden="true">
          <div className="manifesto-kinetic-track">
            {[...t.manifesto.kinetic, ...t.manifesto.kinetic].map((word, index) => (
              <span key={`${word}-${index}`}>
                {word}
                <i>↗</i>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Proof({ t }: { t: Copy }) {
  const cycle = useAutoCycle({ length: t.proof.items.length, interval: 6200 });
  const active = cycle.active;
  const item = t.proof.items[active]!;

  return (
    <section
      ref={cycle.rootRef}
      data-motion-chapter
      className="proof-chapter relative bg-background py-24 sm:py-32 lg:py-36"
      onFocusCapture={() => cycle.setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) cycle.setPaused(false);
      }}
    >
      <SectionWipe tone="light" />
      <Container>
        <Eyebrow>{t.proof.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2
            data-motion-title
            className="display max-w-3xl text-5xl leading-[0.9] text-foreground sm:text-6xl lg:col-span-8 lg:text-[4.15rem]"
          >
            {t.proof.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-4">
            {t.proof.intro}
          </p>
        </div>

        <div
          data-motion-screen
          className="proof-deck mt-14 grid overflow-hidden lg:grid-cols-[1.15fr_0.85fr]"
        >
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
                  onClick={() => cycle.shift(-1)}
                  aria-label={t.proof.previous}
                  className="circle-control"
                >
                  <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => cycle.shift(1)}
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
                onClick={() => cycle.select(index)}
                aria-pressed={active === index}
                className={`proof-picker ${active === index ? "is-active" : ""}`}
              >
                <span className="meta text-primary">0{index + 1}</span>
                <span className="display mt-3 text-2xl text-foreground">{proof.k}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {proof.v}
                </span>
                {active === index && (
                  <span className="auto-cycle-progress" aria-hidden="true">
                    <span
                      key={`${cycle.cycleKey}-${index}-${cycle.running}`}
                      className={cycle.running ? "is-running" : ""}
                      style={{ "--cycle-duration": `${cycle.interval}ms` } as CSSProperties}
                    />
                  </span>
                )}
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
      data-motion-chapter
      className="case-chapter relative overflow-hidden bg-[#0b0d11] py-24 sm:py-32 lg:py-40"
    >
      <SectionWipe tone="blue" />
      <Container>
        <Eyebrow>{t.systems.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <h2
            data-motion-title
            className="display max-w-4xl text-5xl leading-[0.9] text-foreground sm:text-6xl lg:col-span-8 lg:text-[4.35rem]"
          >
            {t.systems.title}
          </h2>
          <p className="self-end text-base leading-relaxed text-muted-foreground lg:col-span-4">
            {t.systems.intro}
          </p>
        </div>

        <CinematicCase className="mt-16">
          <div className="case-cinematic-stage">
            <span aria-hidden="true" className="case-signal" />
            <div data-motion-screen className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="case-cinematic-visual relative lg:col-span-7">
                <div className="case-preview group relative overflow-hidden rounded-[1.35rem] bg-[#07131a] p-3 sm:p-5">
                  <img
                    src="/images/projects/aurhea.webp"
                    alt={t.systems.previewAlt}
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
                <div className="case-flow-wrap">
                  <ol className="case-flow case-cinematic-flow">
                    {t.systems.flow.map((step, index) => (
                      <li key={step}>
                        <span className="case-flow-index">0{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <span className="case-flow-tracer" aria-hidden="true">
                    <i />
                  </span>
                </div>
                <ArrowLink
                  href={links.aurhea}
                  external
                  externalLabel={t.nav.newTab}
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
    projects.findIndex((project) => project.id === "aurhea"),
  );
  const cycle = useAutoCycle({ length: projects.length, initial: initialProject, interval: 7200 });
  const activeIndex = cycle.active;
  const project = projects[activeIndex]!;
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const rail = railRef.current;
    const thumb = thumbRefs.current[activeIndex];
    if (!rail || !thumb) return;
    const left = thumb.offsetLeft - (rail.clientWidth - thumb.clientWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, left),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [activeIndex]);

  return (
    <section
      ref={cycle.rootRef}
      id="work"
      data-motion-chapter
      className="project-chapter relative overflow-hidden bg-background py-24 sm:py-32 lg:py-36"
      onFocusCapture={() => cycle.setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) cycle.setPaused(false);
      }}
    >
      <SectionWipe tone="dark" />
      <Container>
        <Eyebrow>{t.work.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-motion-title
            className="display max-w-4xl text-5xl leading-[0.9] text-foreground sm:text-6xl lg:col-span-8 lg:text-[4.35rem]"
          >
            {t.work.title}
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground lg:col-span-4">
            {t.work.intro}
          </p>
        </div>

        <div
          data-motion-screen
          className="project-stage mt-14 grid gap-7 p-3 sm:p-5 lg:grid-cols-12 lg:gap-10 lg:p-7"
        >
          <ProjectScreen className="lg:col-span-8" motionKey={project.id}>
            <img
              key={project.id}
              src={project.image}
              alt={`${t.work.previewAlt} ${project.title}`}
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
                {project.categories[lang].map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              <div className="mt-7">
                <p className="meta text-white/40">{t.work.role}</p>
                <p className="mt-2 text-sm text-white/78">{project.role[lang].join(" · ")}</p>
              </div>
              {project.status && <p className="meta mt-6 text-primary">{project.status[lang]}</p>}
            </div>
            <span className="project-auto-progress" aria-hidden="true">
              <span
                key={`${cycle.cycleKey}-${project.id}-${cycle.running}`}
                className={cycle.running ? "is-running" : ""}
                style={{ "--cycle-duration": `${cycle.interval}ms` } as CSSProperties}
              />
            </span>
            <div className="project-actions mt-9">
              {project.liveUrl && (
                <ArrowLink
                  href={project.liveUrl}
                  external
                  externalLabel={t.nav.newTab}
                  variant="solid"
                >
                  {t.work.view}
                </ArrowLink>
              )}
              <button
                type="button"
                onClick={() => cycle.shift(-1)}
                aria-label={t.work.previous}
                className="circle-control"
              >
                <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => cycle.shift(1)}
                aria-label={t.work.next}
                className="circle-control"
              >
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div ref={railRef} className="project-rail mt-6" aria-label={t.work.eyebrow}>
          {projects.map((item, index) => (
            <button
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              key={item.id}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => cycle.select(index)}
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
  const cycle = useAutoCycle({ length: t.timeline.steps.length, interval: 7600 });
  const active = cycle.active;
  const step = t.timeline.steps[active]!;

  return (
    <section
      ref={cycle.rootRef}
      id="profile"
      data-motion-chapter
      className="trajectory-chapter relative bg-[#e8ecf2] py-24 text-[#10141a] sm:py-32 lg:py-36"
      onFocusCapture={() => cycle.setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) cycle.setPaused(false);
      }}
    >
      <SectionWipe tone="dark" />
      <Container>
        <Eyebrow>{t.timeline.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-motion-title
            className="display max-w-4xl text-5xl leading-[0.9] sm:text-6xl lg:col-span-8 lg:text-[4.35rem]"
          >
            {t.timeline.title}
          </h2>
          <p className="text-base leading-relaxed text-[#4b5563] lg:col-span-4">
            {t.timeline.intro}
          </p>
        </div>

        <ScrollDrift className="mt-16" speed={0.035}>
          <div className="trajectory-board grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:p-10">
            <span className="trajectory-progress-line" aria-hidden="true">
              <span style={{ transform: `scaleY(${(active + 1) / t.timeline.steps.length})` }} />
            </span>
            <div className="lg:col-span-5">
              <p className="meta text-[#5c7391]">
                0{active + 1} / 0{t.timeline.steps.length}
              </p>
              <Reveal key={step.k} className="trajectory-detail mt-8">
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
                    onClick={() => cycle.select(index)}
                    aria-pressed={active === index}
                    className={active === index ? "is-active" : ""}
                  >
                    <span className="trajectory-dot" aria-hidden="true" />
                    <span className="meta">0{index + 1}</span>
                    <span>{item.k}</span>
                    {active === index && (
                      <span className="trajectory-cycle-progress" aria-hidden="true">
                        <span
                          key={`${cycle.cycleKey}-${index}-${cycle.running}`}
                          className={cycle.running ? "is-running" : ""}
                          style={{ "--cycle-duration": `${cycle.interval}ms` } as CSSProperties}
                        />
                      </span>
                    )}
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
  const step = t.story.process[active]!;

  return (
    <section
      data-motion-chapter
      className="story-chapter relative bg-background py-24 sm:py-32 lg:py-36"
    >
      <SectionWipe tone="light" />
      <Container>
        <Eyebrow>{t.story.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <h2
            data-motion-title
            className="display max-w-4xl text-5xl leading-[0.9] text-foreground sm:text-6xl lg:col-span-8 lg:text-[4.35rem]"
          >
            {t.story.title}
          </h2>
          <p className="self-end text-base leading-relaxed text-muted-foreground lg:col-span-4">
            {t.story.body}
          </p>
        </div>

        <div data-motion-screen className="method-stage mt-16 grid overflow-hidden lg:grid-cols-12">
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
            <div className="method-progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${(active + 1) / t.story.process.length})` }} />
            </div>
          </div>
          <div className="method-choices bg-white/[0.035] lg:col-span-7">
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
    <section
      data-motion-chapter
      className="services-chapter bg-[#0d1219] py-24 sm:py-32 lg:py-36"
      onPointerMove={setSpotlight}
    >
      <SectionWipe tone="blue" />
      <span className="services-signal" aria-hidden="true" />
      <Container className="relative">
        <Eyebrow>{t.services.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-motion-title
            className="display max-w-4xl text-5xl leading-[0.9] text-foreground sm:text-6xl lg:col-span-9 lg:text-[4.35rem]"
          >
            {t.services.title}
          </h2>
        </div>
        <div className="service-accordion mt-16">
          {t.services.groups.map((group, index) => {
            const isOpen = open === index;
            return (
              <div key={group.t} className={isOpen ? "is-open" : ""}>
                <button
                  id={`service-trigger-${index}`}
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${index}`}
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
                <div
                  id={`service-panel-${index}`}
                  className="service-panel"
                  role="region"
                  aria-labelledby={`service-trigger-${index}`}
                  aria-hidden={!isOpen}
                >
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
        <ArrowLink href="#contact" icon="right" className="service-cta mt-10">
          {t.services.cta}
        </ArrowLink>
      </Container>
    </section>
  );
}

export function Contact({ t, lang }: { t: Copy; lang: Lang }) {
  const channels = [
    { k: t.contact.email, v: links.email, href: links.emailHref, external: false },
    { k: t.contact.whatsapp, v: links.whatsappNumber, href: links.whatsapp(lang), external: false },
    { k: t.contact.linkedin, v: "Antony Rodrigues", href: links.linkedin, external: true },
    { k: t.contact.github, v: links.githubHandle, href: links.github, external: true },
    { k: t.contact.instagram, v: links.instagramHandle, href: links.instagram, external: true },
    { k: t.contact.aurhea, v: "aurheatec", href: links.aurhea, external: true },
  ];

  return (
    <section
      id="contact"
      data-motion-chapter
      className="contact-chapter relative bg-background py-24 sm:py-32 lg:py-36"
    >
      <SectionWipe tone="dark" />
      <Container>
        <Eyebrow>{t.contact.eyebrow}</Eyebrow>
        <h2
          data-motion-title
          className="mt-10 max-w-6xl text-[11vw] leading-[0.84] sm:text-7xl lg:text-[5.7rem]"
        >
          <span className="display block text-foreground">{t.contact.title1}</span>
          <span className="display block text-foreground">{t.contact.title2}</span>
          <span className="editorial mt-5 block text-primary">{t.contact.accent}</span>
        </h2>

        <div data-motion-screen className="mt-16 grid gap-4 lg:grid-cols-2">
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

        <div className="contact-channels mt-20">
          <div className="contact-channels-head">
            <p className="meta text-primary">{t.contact.channels}</p>
            <p>{t.contact.channelsIntro}</p>
          </div>
          <ul className="channel-list">
            {channels.map((channel, index) => (
              <li key={channel.k}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onPointerMove={setSpotlight}
                  className="channel-link"
                >
                  <span className="font-editorial channel-index">0{index + 1}</span>
                  <span className="channel-name">
                    <strong className="display">{channel.k}</strong>
                    <small>{channel.v}</small>
                  </span>
                  <span className="channel-arrow">
                    {channel.external ? <span className="sr-only"> — {t.nav.newTab}</span> : null}
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
    <footer className="portfolio-footer bg-[#08090c] py-12 text-white sm:py-16">
      <Container className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="footer-signature" aria-label={t.footer.topLabel}>
            <span className="meta text-white/35">{t.footer.madeBy}</span>
            <strong className="display mt-3 block text-4xl font-bold">
              ANTONY <span className="font-editorial text-primary normal-case">Rodrigues</span>
              <span className="footer-top-mark" aria-hidden="true">
                ↑
              </span>
            </strong>
          </a>
          <p className="mt-3 text-sm text-white/55">{t.footer.role}</p>
        </div>
        <p className="meta text-white/35 sm:text-right">{t.footer.place}</p>
      </Container>
    </footer>
  );
}
