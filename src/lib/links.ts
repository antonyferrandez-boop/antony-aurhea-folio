const waMessage = {
  pt: "Olá Antony, encontrei seu portfólio e gostaria de conversar sobre um projeto/oportunidade.",
  en: "Hi Antony, I found your portfolio and would like to talk about a project/opportunity.",
} as const;

export const links = {
  email: "antony-aurhea@outlook.pt",
  emailHref: "mailto:antony-aurhea@outlook.pt",
  whatsappNumber: "+55 54 99661-0207",
  whatsapp: (lang: "pt" | "en") =>
    `https://wa.me/5554996610207?text=${encodeURIComponent(waMessage[lang])}`,
  linkedin: "https://www.linkedin.com/in/antony-rodrigues-688416284/",
  github: "https://github.com/antonyrodrigues-dev",
  instagram: "https://www.instagram.com/antonyzz07/",
  instagramHandle: "@antonyzz07",
  aurhea: "https://www.aurheatec.com.br/",
} as const;

export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;