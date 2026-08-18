import { useEffect, useRef, useState } from "react";
import type { Copy, Lang } from "@/content/copy";
import { links } from "@/lib/links";
import { Container } from "./primitives";

export function Nav({ t, lang, onToggleLang }: { t: Copy; lang: Lang; onToggleLang: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const items = [
    { id: "work", label: t.nav.work },
    { id: "systems", label: t.nav.systems },
    { id: "profile", label: t.nav.profile },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const observed = ["work", "systems", "profile", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry?.target.id) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-24% 0px -62%", threshold: [0, 0.12, 0.3] },
    );
    observed.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const overlay = overlayRef.current;
    const focusables = overlay?.querySelectorAll<HTMLElement>("a,button");
    focusables?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
      <Container>
        <div className="nav-frame flex h-16 items-center justify-end sm:h-20">
          <nav
            aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
            className="hidden flex-1 items-center justify-center gap-7 lg:flex"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? "is-current" : ""}`}
                aria-current={activeSection === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
            <a
              href={links.aurhea}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-primary-highlight"
            >
              {t.nav.aurhea}
              <span className="sr-only"> — {t.nav.newTab}</span>
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t.nav.langLabel}
              className="lang-toggle"
            >
              <span className={lang === "pt" ? "text-primary" : undefined}>PT</span>
              <span aria-hidden="true" className="text-white/20">
                /
              </span>
              <span className={lang === "en" ? "text-primary" : undefined}>EN</span>
            </button>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              className="menu-trigger lg:hidden"
            >
              {t.nav.menu}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="mobile-nav-overlay fixed inset-0 z-50 bg-[#08090c] lg:hidden"
        >
          <Container className="flex h-16 items-center justify-end sm:h-20">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={t.nav.closeMenu}
              className="menu-trigger"
            >
              {t.nav.close}
            </button>
          </Container>
          <Container className="flex min-h-[calc(100dvh-5rem)] flex-col justify-center pb-20">
            <div className="flex flex-col gap-1">
              {items.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="mobile-nav-link"
                  style={{ transitionDelay: `${index * 45}ms` }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={links.aurhea}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mobile-nav-link text-primary"
                style={{ transitionDelay: "180ms" }}
              >
                {t.nav.aurhea}
                <span className="sr-only"> — {t.nav.newTab}</span>
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
