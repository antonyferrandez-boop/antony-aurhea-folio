import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hero } from "@/components/portfolio/Hero";
import { ChapterTransition } from "@/components/portfolio/ChapterTransition";
import { Nav } from "@/components/portfolio/Nav";
import { PageMotion } from "@/components/portfolio/PageMotion";
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
import { links } from "@/lib/links";

const portfolioUrl = "https://antony-aurhea-folio.lovable.app/";
const socialImage = `${portfolioUrl}og.png`;

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
      { name: "theme-color", content: "#05070a" },
      { property: "og:title", content: "Antony Rodrigues — Founder & Developer da AURHEA" },
      {
        property: "og:description",
        content: "Produtos digitais, sistemas e automações pensados a partir de operações reais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: portfolioUrl },
      { property: "og:site_name", content: "Antony Rodrigues" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: socialImage },
      { property: "og:image:alt", content: "Antony Rodrigues — Produto, design e desenvolvimento" },
      { property: "og:image:width", content: "1730" },
      { property: "og:image:height", content: "909" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Antony Rodrigues — Founder & Developer da AURHEA" },
      {
        name: "twitter:description",
        content: "Produtos digitais, sistemas e automações pensados a partir de operações reais.",
      },
      { name: "twitter:image", content: socialImage },
    ],
    links: [{ rel: "canonical", href: portfolioUrl }],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = copy[lang];
  useEffect(() => {
    const isPortuguese = lang === "pt";
    const title = isPortuguese
      ? "Antony Rodrigues — Founder & Developer da AURHEA"
      : "Antony Rodrigues — AURHEA Founder & Developer";
    const description = isPortuguese
      ? "Portfólio de Antony Rodrigues: produtos digitais, sistemas e automações para operações do mundo real."
      : "Antony Rodrigues' portfolio: digital products, systems and automation for real-world operations.";
    document.documentElement.lang = isPortuguese ? "pt-BR" : "en";
    document.title = title;
    document.querySelectorAll<HTMLMetaElement>('meta[name="description"]').forEach((meta) => {
      meta.content = description;
    });
    document.querySelectorAll<HTMLMetaElement>('meta[property="og:title"]').forEach((meta) => {
      meta.content = title;
    });
    document
      .querySelectorAll<HTMLMetaElement>('meta[property="og:description"]')
      .forEach((meta) => {
        meta.content = description;
      });
    document.querySelectorAll<HTMLMetaElement>('meta[property="og:locale"]').forEach((meta) => {
      meta.content = isPortuguese ? "pt_BR" : "en_US";
    });
    document.querySelectorAll<HTMLMetaElement>('meta[name="twitter:title"]').forEach((meta) => {
      meta.content = title;
    });
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="twitter:description"]')
      .forEach((meta) => {
        meta.content = description;
      });
  }, [lang]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Antony Rodrigues",
        jobTitle: "Founder & Developer",
        worksFor: { "@id": `${portfolioUrl}#aurhea` },
        url: portfolioUrl,
        image: socialImage,
        sameAs: [links.linkedin, links.github, links.instagram, links.aurhea],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${portfolioUrl}#aurhea`,
        name: "AURHEA",
        description:
          "Desenvolvimento de produtos digitais, sistemas, automações e soluções para operações reais.",
        areaServed: "Brasil",
        url: links.aurhea,
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
        <PageMotion locale={lang} />
        <Hero t={t} />
        <ChapterTransition label={t.manifesto.eyebrow} />
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
