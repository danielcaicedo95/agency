export interface MetricGrowth {
  before: string;
  after: string;
  growth: string;
}

export interface CasoExito {
  id: string;
  sector: string;
  categoryBadge: string;
  title: string;
  subtitle: string;
  gscImage: string;
  period: string;
  metrics: {
    impressions: MetricGrowth;
    clicks: MetricGrowth;
    ctr: string;
    avgPosition: string;
  };
  strategies: string[];
  challenge: string;
  solution: string;
  impact: string;
  featuredQuote?: string;
}

export const CASOS_EXITO: CasoExito[] = [
  {
    id: 'brico-piscinas',
    sector: 'Bricolaje y Piscinas',
    categoryBadge: 'Equipamiento & Hogar',
    title: 'De 45K a 850K Impresiones en Piscinas y Bricolaje',
    subtitle: 'Arquitectura GEO, E-E-A-T y optimización para resúmenes de IA en Google (SGE).',
    gscImage: '/gsc-automoviles.png',
    period: 'Últimos 12 Meses',
    metrics: {
      impressions: { before: '45.000', after: '850.000', growth: '+1.788%' },
      clicks: { before: '1.200', after: '34.500', growth: '+2.775%' },
      ctr: '4.1%',
      avgPosition: '8.4',
    },
    strategies: [
      'Señales E-E-A-T Avanzadas',
      'SEO GEO / Multi-región',
      'Optimizaciones IA / SGE',
      'Marcado Schema Estructurado',
    ],
    challenge: 'Alta competencia frente a grandes superficies y nulo posicionamiento local.',
    solution: 'Autores expertos verificados, clusters geolocalizados y respuestas adaptadas a IA.',
    impact: 'Tráfico orgánico x28 e incremento del 310% en solicitudes de presupuesto.',
    featuredQuote: 'Dominio total de búsquedas transaccionales superando competidores históricos.',
  },
  {
    id: 'ciclismo',
    sector: 'Ciclismo y Bicicletas',
    categoryBadge: 'E-commerce Deportivo',
    title: 'Crecimiento de 2.5K a 48K Clics Mensuales',
    subtitle: 'SEO On-Page profundo en +12,000 SKUs y optimización técnica de Core Web Vitals.',
    gscImage: '/gsc-ropa.png',
    period: 'Últimos 12 Meses',
    metrics: {
      impressions: { before: '80.000', after: '1.200.000', growth: '+1.400%' },
      clicks: { before: '2.500', after: '48.000', growth: '+1.820%' },
      ctr: '4.0%',
      avgPosition: '9.1',
    },
    strategies: [
      'SEO On-Page en Categorías',
      'SEO Técnico & Web Vitals',
      'Enlazado Interno por Facetas',
      'Renderizado SSR Optimizado',
    ],
    challenge: 'Catálogo de 12K SKUs con canibalización interna y lentitud de carga.',
    solution: 'Canonicalización de filtros, indexación estratégica y compresión WebP automatizada.',
    impact: 'Posicionamiento masivo en Top 3 y 4.2% de tasa de conversión orgánica.',
    featuredQuote: 'Transformamos un catálogo complejo en nuestra mayor ventaja competitiva en Google.',
  },
  {
    id: 'automoviles',
    sector: 'Automotriz y Repuestos',
    categoryBadge: 'Sector Motor & Autopartes',
    title: 'Dominio Sector Motor: 41.2K Clics / Mes',
    subtitle: 'Content Hubs por modelo, arquitectura SILO y linkbuilding especializado.',
    gscImage: '/gsc-automoviles.png',
    period: 'Últimos 12 Meses',
    metrics: {
      impressions: { before: '60.000', after: '980.000', growth: '+1.533%' },
      clicks: { before: '1.800', after: '41.200', growth: '+2.188%' },
      ctr: '4.2%',
      avgPosition: '11.4',
    },
    strategies: [
      'Arquitectura SILO / Hubs',
      'SEO de Fichas de Repuestos',
      'Linkbuilding Sectorial',
      'Indexación de Compatibilidades',
    ],
    challenge: 'Intensidad competitiva y necesidad de precisión en compatibilidad de piezas.',
    solution: 'Estructura SILO por sistemas del vehículo y datos estructurados de autopartes.',
    impact: '+4,500 keywords transaccionales en Top 10 y reducción del CAC en 65%.',
    featuredQuote: 'Superamos redes oficiales captando intenciones de reparación inmediata.',
  },
  {
    id: 'e-commerce-ropa',
    sector: 'E-commerce de Ropa y Moda',
    categoryBadge: 'Fashion & Apparel',
    title: 'Escalado Moda: De 3.1K a 62.8K Clics / Mes',
    subtitle: 'SEO visual para Google Lens y Discover con taxonomías de tendencia estacional.',
    gscImage: '/gsc-ropa.png',
    period: 'Últimos 12 Meses',
    metrics: {
      impressions: { before: '120.000', after: '1.900.000', growth: '+1.483%' },
      clicks: { before: '3.100', after: '62.800', growth: '+1.925%' },
      ctr: '3.3%',
      avgPosition: '9.8',
    },
    strategies: [
      'SEO Visual & Google Lens',
      'Rich Snippets Product & Offer',
      'Taxonomías Estacionales',
      'Optimización para Google Discover',
    ],
    challenge: 'Alta rotación de stock por temporada y URLs obsoletas con pérdidas de tráfico.',
    solution: 'URLs de tendencia permanentes con 301 dinámicos y Rich Snippets de producto.',
    impact: '40% del tráfico captado desde búsquedas visuales y feed de Google Discover.',
    featuredQuote: 'SEO visual y datos de producto convirtieron la moda estacional en ventas constantes.',
  },
  {
    id: 'spa-bienestar',
    sector: 'Spa & Bienestar',
    categoryBadge: 'Salud & Wellness',
    title: 'Crecimiento Orgánico de +4,100% en Clientes',
    subtitle: 'SEO Local de alta precisión y landing pages geolocalizadas optimizadas (CRO).',
    gscImage: '/gsc-spa.png',
    period: 'Últimos 12 Meses',
    metrics: {
      impressions: { before: '15.000', after: '340.000', growth: '+2.166%' },
      clicks: { before: '450', after: '18.900', growth: '+4.100%' },
      ctr: '5.6%',
      avgPosition: '8.2',
    },
    strategies: [
      'SEO Local & Google Maps',
      'CRO & Embudo de Reserva Directa',
      'Schema DaySpa / Wellness',
      'Landings Geolocalizadas',
    ],
    challenge: 'Competencia feroz en captación local sin depender de pauta publicitaria.',
    solution: 'Landings por intención, datos Schema y optimización de Google Maps.',
    impact: 'Top 3 constante en mapas y búsquedas orgánicas con 85%+ de ocupación.',
    featuredQuote: 'Consolidación total de marca líder en Google Maps y búsqueda local.',
  },
];

