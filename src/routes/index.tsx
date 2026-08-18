import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Antony Rodrigues — Founder & Developer da AURHEA" },
      {
        name: "description",
        content:
          "Portfólio de Antony Rodrigues, Founder & Developer da AURHEA: produtos digitais, engenharia e design com estética editorial e tecnológica.",
      },
      { property: "og:title", content: "Antony Rodrigues — Founder & Developer da AURHEA" },
      {
        property: "og:description",
        content: "Produtos digitais, engenharia e design por Antony Rodrigues (AURHEA).",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">AURHEA</p>
        <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
          Antony Rodrigues
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Founder &amp; Developer. Construindo produtos digitais com engenharia precisa e
          direção visual editorial.
        </p>
        <div className="mt-10 h-px w-24 bg-primary" />
        <p className="mt-10 text-sm text-muted-foreground">
          Portfólio em construção — aguardando materiais e requisitos completos.
        </p>
      </div>
    </main>
  );
}
