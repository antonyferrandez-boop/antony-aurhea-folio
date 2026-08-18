import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-14", className)}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="meta text-primary">{children}</span>
      <span className="rule-line hidden flex-1 sm:block" aria-hidden="true" />
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  external,
  variant = "outline",
  className,
  icon = "up-right",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "outline" | "solid" | "bare";
  className?: string;
  icon?: "up-right" | "right" | "down";
}) {
  const glyph = icon === "right" ? "→" : icon === "down" ? "↓" : "↗";
  const base =
    "group inline-flex min-h-11 items-center justify-between gap-6 rounded-xs transition-colors duration-200";
  const styles = {
    outline:
      "border border-border px-5 py-3 text-foreground hover:border-border-hover hover:bg-surface",
    solid:
      "border border-primary bg-primary px-5 py-3 text-primary-foreground hover:bg-primary-highlight hover:border-primary-highlight",
    bare: "text-foreground hover:text-primary",
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, styles, "meta", className)}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="translate-x-0 text-sm transition-transform duration-200 group-hover:translate-x-1"
      >
        {glyph}
      </span>
    </a>
  );
}