import aurheaShot from "@/assets/aurhea.webp.asset.json";
import sevenDShot from "@/assets/7d.webp.asset.json";
import bravosShot from "@/assets/bravos.webp.asset.json";
import brolloShot from "@/assets/brollo.webp.asset.json";
import giihShot from "@/assets/giih.webp.asset.json";

export type Project = {
  id: string;
  index: string;
  title: string;
  year: number;
  categories: string[];
  role: string[];
  description: { pt: string; en: string };
  liveUrl?: string;
  image?: string;
  status?: { pt: string; en: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "aurhea",
    index: "001",
    title: "AURHEA",
    year: 2026,
    categories: ["TECHNOLOGY COMPANY", "SYSTEMS", "AUTOMATION"],
    role: ["FOUNDER", "DEVELOPER"],
    description: {
      pt: "Empresa de tecnologia criada para desenvolver produtos digitais, sistemas, automações e soluções aplicadas a negócios reais.",
      en: "Technology company built to develop digital products, systems, automation and solutions applied to real businesses.",
    },
    liveUrl: "https://www.aurheatec.com.br/",
    image: aurheaShot.url,
    featured: true,
  },
  {
    id: "porco-morto",
    index: "002",
    title: "PORCO MORTO",
    year: 2026,
    categories: ["RESTAURANT OPERATIONS SYSTEM", "FULL STACK"],
    role: ["PRODUCT", "DESIGN", "DEVELOPMENT"],
    description: {
      pt: "Sistema completo de operação para restaurante: pedidos, administração, fluxo financeiro e operação em tempo real sobre um backend autoritativo.",
      en: "End-to-end restaurant operations system: orders, administration, financial flow and realtime operation on top of an authoritative backend.",
    },
    featured: true,
  },
  {
    id: "brollo",
    index: "003",
    title: "BROLLO BORDADOS",
    year: 2026,
    categories: ["INDUSTRY", "B2B", "DIGITAL COMMERCE"],
    role: ["DESIGN", "DEVELOPMENT"],
    description: {
      pt: "Digitalização da presença comercial de uma operação industrial: produto, catálogo, orçamento e contato em um fluxo direto.",
      en: "Digitalizing the commercial presence of an industrial operation: product, catalog, quote and contact in one direct flow.",
    },
    liveUrl: "https://brollobordados.com",
    image: brolloShot.url,
  },
  {
    id: "7d",
    index: "004",
    title: "7D IMPORTS",
    year: 2026,
    categories: ["COMMERCE", "BRAND", "DIGITAL EXPERIENCE"],
    role: ["DESIGN", "DEVELOPMENT"],
    description: {
      pt: "Experiência de produto e catálogo com jornada comercial direta até o atendimento por WhatsApp.",
      en: "Product and catalog experience with a direct commercial journey into WhatsApp conversation.",
    },
    liveUrl: "https://import7d.lovable.app",
    image: sevenDShot.url,
  },
  {
    id: "bravos",
    index: "005",
    title: "BRAVOS 7D",
    year: 2026,
    categories: ["SERVICES", "BOOKING", "DIGITAL EXPERIENCE"],
    role: ["DESIGN", "DEVELOPMENT"],
    description: {
      pt: "Plataforma de serviços com agendamento, em produção e em uso real há mais de três meses.",
      en: "Services platform with booking, in production and in real use for more than three months.",
    },
    status: { pt: "EM PRODUÇÃO · 3+ MESES EM USO", en: "IN PRODUCTION · 3+ MONTHS IN USE" },
    liveUrl: "https://bravos7d.com.br",
    image: bravosShot.url,
  },
  {
    id: "giih",
    index: "006",
    title: "GIIH FOTOGRAFIA",
    year: 2026,
    categories: ["CREATIVE", "PORTFOLIO", "DIGITAL EXPERIENCE"],
    role: ["DESIGN", "DEVELOPMENT"],
    description: {
      pt: "Portfólio fotográfico com foco em ritmo visual, leitura de imagem e contato direto.",
      en: "Photography portfolio focused on visual rhythm, image reading and direct contact.",
    },
    liveUrl: "https://giihfotografia.lovable.app",
    image: giihShot.url,
  },
];