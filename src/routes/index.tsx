import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/portfolio/Hero";
import { ChapterTransition } from "@/components/portfolio/ChapterTransition";
import { Nav } from "@/components/portfolio/Nav";
import {
  Contact,
  Footer,
  Manifesto,
  Proof,
  Services,
  Story,
  Systems,
  Timeline,
  Work,
} from "@/components/portfolio/Sections";
import { copy, type Lang } from "@/content/copy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Antony Rodrigues — Founder & Developer da AURHEA" },
      {
        name: "description",
        content:
          "Portfólio de Antony Rodrigues, Founder & Developer da AURHEA. Produtos digitais, sistemas e automações para operações do mundo real.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Antony Rodrigues — Founder & Developer da AURHEA" },
      {
        property: "og:description",
        content: "Produtos digitais, sistemas e automações pensados a partir de operações reais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = copy[lang];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Antony Rodrigues",
        jobTitle: "Founder & Developer",
        worksFor: { "@type": "Organization", name: "AURHEA" },
        url: "https://www.aurheatec.com.br/",
        sameAs: [
          "https://www.linkedin.com/in/antony-rodrigues-688416284/",
          "https://github.com/antonyrodrigues-dev",
        ],
      },
      {
        "@type": "ProfessionalService",
        name: "AURHEA",
        description:
          "Desenvolvimento de produtos digitais, sistemas, automações e soluções para operações reais.",
        areaServed: "Brasil",
        url: "https://www.aurheatec.com.br/",
      },
    ],
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.nav.skip}
      </a>
      <Nav
        t={t}
        lang={lang}
        onToggleLang={() => setLang((current) => (current === "pt" ? "en" : "pt"))}
      />
      <main id="main-content" className="relative bg-background">
        <Hero t={t} />
        <ChapterTransition />
        <Manifesto t={t} />
        <Proof t={t} />
        <Systems t={t} />
        <Work t={t} lang={lang} />
        <Timeline t={t} />
        <Story t={t} />
        <Services t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
