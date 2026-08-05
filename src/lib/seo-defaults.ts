export interface HreflangItem {
  lang: string;
  url: string;
}

export interface PageSEO {
  path: string; // e.g. "/services"
  title: string;
  description: string;
  robots: string; // e.g. "index, follow"
  canonicalUrl: string;
  hreflangs: HreflangItem[];
  jsonLd?: string; // JSON stringified schema
  isCustom?: boolean;
  updatedAt?: string;
}

// BASE_URL is intentionally empty — full URLs are assembled at runtime
// from window.location.origin (client) or request headers (server)
export const BASE_URL = '';

// ─── KNOWN PAGES DISCOVERY LIST ─────────────────────────────────────────────
export const KNOWN_PAGES = [
  { path: '/', label: 'Inicio (ES)', lang: 'es' },
  { path: '/services', label: 'Servicios & Habilidades (ES)', lang: 'es' },
  { path: '/about', label: 'Sobre Mí (ES)', lang: 'es' },
  { path: '/work', label: 'Experiencia & Casos (ES)', lang: 'es' },
  { path: '/casos-de-exito', label: 'Casos de Éxito GSC (ES)', lang: 'es' },
  { path: '/contact', label: 'Contacto (ES)', lang: 'es' },
  { path: '/en', label: 'Home (EN)', lang: 'en' },
  { path: '/en/services', label: 'Services & Skills (EN)', lang: 'en' },
  { path: '/en/about', label: 'About Me (EN)', lang: 'en' },
  { path: '/en/work', label: 'Experience (EN)', lang: 'en' },
  { path: '/en/casos-de-exito', label: 'Case Studies (EN)', lang: 'en' },
  { path: '/en/contact', label: 'Contact (EN)', lang: 'en' },
];

// ─── AUTOMATIC DEFAULTS GENERATOR ────────────────────────────────────────────
export function getDefaultSEO(targetPath: string): PageSEO {
  const normalizedPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const canonical = `${BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
  const isEn = normalizedPath.startsWith('/en');

  // Compute corresponding language alternate
  let esPath = normalizedPath;
  let enPath = normalizedPath;
  if (isEn) {
    esPath = normalizedPath.replace(/^\/en/, '') || '/';
  } else {
    enPath = normalizedPath === '/' ? '/en' : `/en${normalizedPath}`;
  }

  const hreflangs: HreflangItem[] = [
    { lang: 'es', url: esPath === '/' ? '' : esPath },
    { lang: 'en', url: enPath },
    { lang: 'x-default', url: esPath === '/' ? '' : esPath },
  ];

  // Default title & description per route
  let title = 'Daniel Caicedo | Especialista SEO, SEM & Automatización IA';
  let description = 'Portafolio Profesional de Daniel Caicedo: Experto en SEO Técnico, E-commerce (Shopify, VTEX), campañas Google Ads, Analítica Web (GA4, GTM) y Automatización IA.';

  switch (normalizedPath) {
    case '/services':
      title = 'Servicios SEO, SEM & Automatización IA | Daniel Caicedo';
      description = 'Servicios especializados en SEO Técnico, Optimización WPO, Google Ads, GA4 y Automatización de workflows con Inteligencia Artificial.';
      break;
    case '/about':
      title = 'Sobre Mí — +7 Años de Experiencia | Daniel Caicedo';
      description = 'Conoce mi trayectoria profesional como Consultor SEO & SEM. Más de 7 años impulsando crecimiento orgánico y conversión para e-commerce y empresas.';
      break;
    case '/work':
      title = 'Experiencia Laboral & Casos de Éxito | Daniel Caicedo';
      description = 'Casos reales de crecimiento en Google Search Console (+1,800% clics orgánicos) y proyectos ejecutados en e-commerce y empresas líderes.';
      break;
    case '/casos-de-exito':
      title = 'Casos de Éxito SEO Verificados GSC | Daniel Caicedo';
      description = 'Métricas reales de Google Search Console documentadas por sector: Automotriz, Educación, E-commerce, B2B y Servicios.';
      break;
    case '/contact':
      title = 'Contacto Directo | Daniel Caicedo — SEO & AI Consultant';
      description = 'Ponte en contacto con Daniel Caicedo para proyectos de SEO Técnico, Auditorías Web, Estrategia SEM o Automatizaciones IA.';
      break;
    case '/en':
      title = 'Daniel Caicedo | Technical SEO Specialist & AI Automation Expert';
      description = 'Professional Portfolio of Daniel Caicedo: Senior SEO Specialist, E-commerce Growth, Google Ads, GA4 Analytics and AI Workflows Automation.';
      break;
    case '/en/services':
      title = 'SEO, SEM & AI Automation Services | Daniel Caicedo';
      description = 'Specialized Technical SEO audits, WPO optimization, Google Ads campaigns, and AI process automation for global businesses.';
      break;
    case '/en/about':
      title = 'About Me — +7 Years Experience | Daniel Caicedo';
      description = 'Learn about my experience as a Technical SEO & SEM Consultant. Over 7 years scaling organic traffic and conversions for enterprises.';
      break;
    case '/en/work':
      title = 'Work Experience & Case Studies | Daniel Caicedo';
      description = 'Proven Search Console results (+1,800% organic growth) and enterprise e-commerce case studies.';
      break;
    case '/en/casos-de-exito':
      title = 'Verified SEO Case Studies (GSC) | Daniel Caicedo';
      description = 'Real Google Search Console growth metrics across Automotive, Education, E-commerce, B2B, and Service sectors.';
      break;
    case '/en/contact':
      title = 'Get in Touch | Daniel Caicedo — SEO & AI Specialist';
      description = 'Contact Daniel Caicedo for Technical SEO audits, SEM strategy, or AI automation solutions.';
      break;
  }

  // JSON-LD uses paths only; the actual domain is injected at runtime by SEOMetadata.tsx
  const canonicalPath = normalizedPath === '/' ? '' : normalizedPath;
  const defaultJsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: canonicalPath,
      author: {
        '@type': 'Person',
        name: 'Daniel Caicedo',
        jobTitle: 'Especialista SEO, SEM & Automatización IA',
        url: '/',
      },
    },
    null,
    2
  );

  return {
    path: normalizedPath,
    title,
    description,
    robots: 'index, follow',
    canonicalUrl: normalizedPath === '/' ? '' : normalizedPath,
    hreflangs,
    jsonLd: defaultJsonLd,
    isCustom: false,
    updatedAt: new Date().toISOString(),
  };
}
