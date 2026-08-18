import { links } from "@/lib/links";
import type { Lang } from "./copy";

export type Project = {
  id: string;
  index: string;
  title: string;
  year: number;
  categories: Record<Lang, string[]>;
  role: Record<Lang, string[]>;
  description: { pt: string; en: string };
  liveUrl?: string;
  image: string;
  status?: { pt: string; en: string };
};

export const projects: Project[] = [
  {
    id: "aurhea",
    index: "001",
    title: "AURHEA",
    year: 2026,
    categories: {
      pt: ["Marca", "Produto digital", "Sistemas"],
      en: ["Brand", "Digital product", "Systems"],
    },
    role: {
      pt: ["Direção", "Design", "Desenvolvimento"],
      en: ["Direction", "Design", "Development"],
    },
    description: {
      pt: "Empresa de tecnologia criada para desenvolver produtos digitais, sistemas, automações e soluções aplicadas a negócios reais.",
      en: "Technology company built to develop digital products, systems, automation and solutions applied to real businesses.",
    },
    liveUrl: "https://www.aurheatec.com.br/",
    image: "/images/projects/aurhea.webp",
  },
  {
    id: "porco-morto",
    index: "002",
    title: "PORCO MORTO",
    year: 2026,
    categories: {
      pt: ["Restaurante", "Jornada de pedido", "Operação"],
      en: ["Restaurant", "Ordering journey", "Operations"],
    },
    role: {
      pt: ["Produto", "Design", "Desenvolvimento"],
      en: ["Product", "Design", "Development"],
    },
    description: {
      pt: "Sistema completo de operação para restaurante: pedidos, administração, fluxo financeiro e operação em tempo real sobre um backend autoritativo.",
      en: "End-to-end restaurant operations system: orders, administration, financial flow and realtime operation on top of an authoritative backend.",
    },
    liveUrl: links.projects.porcoMorto,
    image: "/images/porco-morto-preview.png",
  },
  {
    id: "brollo",
    index: "003",
    title: "BROLLO BORDADOS",
    year: 2026,
    categories: {
      pt: ["Indústria", "Catálogo", "Comercial"],
      en: ["Industry", "Catalog", "Commercial"],
    },
    role: { pt: ["Design", "Desenvolvimento"], en: ["Design", "Development"] },
    description: {
      pt: "Digitalização da presença comercial de uma operação industrial: produto, catálogo, orçamento e contato em um fluxo direto.",
      en: "Digitalizing the commercial presence of an industrial operation: product, catalog, quote and contact in one direct flow.",
    },
    liveUrl: "https://brollobordados.com",
    image: "/images/projects/brollo.webp",
  },
  {
    id: "7d",
    index: "004",
    title: "7D IMPORTS",
    year: 2026,
    categories: {
      pt: ["Comércio", "Marca", "Experiência digital"],
      en: ["Commerce", "Brand", "Digital experience"],
    },
    role: { pt: ["Design", "Desenvolvimento"], en: ["Design", "Development"] },
    description: {
      pt: "Experiência de produto e catálogo com jornada comercial direta até o atendimento por WhatsApp.",
      en: "Product and catalog experience with a direct commercial journey into WhatsApp conversation.",
    },
    liveUrl: "https://import7d.lovable.app",
    image: "/images/projects/7d.webp",
  },
  {
    id: "bravos",
    index: "005",
    title: "BRAVOS 7D",
    year: 2026,
    categories: {
      pt: ["Serviços", "Agendamento", "Conversão"],
      en: ["Services", "Booking", "Conversion"],
    },
    role: { pt: ["Design", "Desenvolvimento"], en: ["Design", "Development"] },
    description: {
      pt: "Plataforma de serviços com agendamento, em produção e em uso real há mais de três meses.",
      en: "Services platform with booking, in production and in real use for more than three months.",
    },
    status: { pt: "EM PRODUÇÃO · 3+ MESES EM USO", en: "IN PRODUCTION · 3+ MONTHS IN USE" },
    liveUrl: "https://bravos7d.com.br",
    image: "/images/projects/bravos.webp",
  },
  {
    id: "giih",
    index: "006",
    title: "GIIH FOTOGRAFIA",
    year: 2026,
    categories: {
      pt: ["Fotografia", "Portfólio", "Direção visual"],
      en: ["Photography", "Portfolio", "Visual direction"],
    },
    role: { pt: ["Design", "Desenvolvimento"], en: ["Design", "Development"] },
    description: {
      pt: "Portfólio fotográfico com foco em ritmo visual, leitura de imagem e contato direto.",
      en: "Photography portfolio focused on visual rhythm, image reading and direct contact.",
    },
    liveUrl: "https://giihfotografia.lovable.app",
    image: "/images/projects/giih.webp",
  },
];
