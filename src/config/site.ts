export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  adSenseClientId?: string; // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
  googleAdsId?: string; // e.g. "AW-XXXXXXXXX"
  googleAnalyticsId?: string; // e.g. "G-XXXXXXXXX"
  navLinks: { name: string; href: string }[];
  categories: {
    id: string;
    title: string;
    description: string;
    slug: string;
    icon: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "DigitalStack",
  title: "DigitalStack — Portal de IA, Automatización y Herramientas Digitales",
  description: "Aprende a usar Inteligencia Artificial, automatizar tareas, descubrir software y utilizar herramientas interactivas gratuitas para potenciar tu productividad.",
  url: "https://zonarespawn.lat",
  author: "DigitalStack Team",
  adSenseClientId: import.meta.env.PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-4634198418657669",
  googleAdsId: import.meta.env.PUBLIC_GOOGLE_ADS_ID || "", // e.g. AW-XXXXXXXXX
  googleAnalyticsId: import.meta.env.PUBLIC_GA_ID || "", // e.g. G-XXXXXXXXX
  navLinks: [
    { name: "Inicio", href: "/" },
    { name: "Guías", href: "/guias" },
    { name: "Directorio", href: "/herramientas" },
    { name: "Comparativas", href: "/comparativas" },
    { name: "Utilidades", href: "/utilidades" },
    { name: "Recursos", href: "/recursos" },
  ],
  categories: [
    {
      id: "ia",
      title: "Inteligencia Artificial",
      description: "Modelos LLMs, agentes autónomos, prompts y herramientas generativas.",
      slug: "/ia",
      icon: "Cpu",
    },
    {
      id: "automatizacion",
      title: "Automatización",
      description: "Workflows con n8n, Make, Zapier, APIs e integraciones de sistemas.",
      slug: "/automatizacion",
      icon: "Workflow",
    },
    {
      id: "productividad",
      title: "Productividad",
      description: "Gestión de proyectos, organización personal y herramientas de trabajo.",
      slug: "/productividad",
      icon: "Zap",
    },
    {
      id: "herramientas",
      title: "Directorio de Software",
      description: "Catálogo exhaustivo de herramientas analizadas a fondo.",
      slug: "/herramientas",
      icon: "Layers",
    },
  ],
};
