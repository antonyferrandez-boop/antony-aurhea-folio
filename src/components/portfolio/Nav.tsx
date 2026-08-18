import { useEffect, useRef, useState } from "react";
import type { Copy, Lang } from "@/content/copy";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

export function Nav({
  t,
  lang,
  onToggleLang,
}: {
  t: Copy;
  lang: Lang;
  onToggleLang: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const items: Item[] = [
    { id: "work", label: t.nav.work },
    { id: "systems", label: t.nav.systems },
    { id: "profile", label: t.nav.profile },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const overlay = overlayRef.current;
    const focusables = overlay?.querySelectorAll<HTMLElement>("a,button");
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="display text-2xl tracking-tight text-foreground">
          AR<span className="text-primary">/26</span>
        </a>

        <nav aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"} className="hidden items-center gap-8 md:flex">
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="meta text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </a>
          ))}
          <a
            href="https://www.aurheatec.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.aurhea}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t.nav.langLabel}
            className="meta flex min-h-11 items-center gap-1 px-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className={lang === "pt" ? "text-primary" : undefined}>PT</span>
            <span aria-hidden="true">/</span>
            <span className={lang === "en" ? "text-primary" : undefined}>EN</span>
          </button>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            className="meta min-h-11 px-2 text-foreground md:hidden"
          >
            {t.nav.menu}
          </button>
        </div>
      </Container>

      {open && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
        >
          <Container className="flex h-16 items-center justify-between">
            <span className="display text-2xl">
              AR<span className="text-primary">/26</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={t.nav.closeMenu}
              className="meta min-h-11 px-2 text-foreground"
            >
              {t.nav.close}
            </button>
          </Container>
          <Container className="flex flex-1 flex-col justify-center gap-2 pb-24">
            {items.map((i) => (
              <a
                key={i.id}
                href={`#${i.id}`}
                onClick={() => setOpen(false)}
                className="display border-b border-border py-4 text-4xl text-foreground transition-colors hover:text-primary"
              >
                {i.label}
              </a>
            ))}
            <a
              href="https://www.aurheatec.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="display border-b border-border py-4 text-4xl text-foreground transition-colors hover:text-primary"
            >
              {t.nav.aurhea}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}