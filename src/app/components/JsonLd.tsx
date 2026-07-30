export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daniel Caicedo',
    jobTitle: 'Especialista en SEO, SEM y Automatización IA',
    description: 'Experto en SEO técnico, campañas SEM (Google Ads), Analítica Web (GA4, GTM, GSC) y Automatización de Procesos con Inteligencia Artificial.',
    email: 'mailto:danielcaicedoco@gmail.com',
    telephone: '+573008061344',
    sameAs: [
      'https://www.linkedin.com',
      'https://github.com'
    ],
    knowsAbout: [
      'Search Engine Optimization (SEO)',
      'Search Engine Advertising (SEA)',
      'Google Ads',
      'Artificial Intelligence Automation',
      'Web Analytics',
      'Google Tag Manager',
      'Google Analytics 4',
      'Shopify Plus SEO',
      'VTEX SEO',
      'Drupal SEO',
      'Core Web Vitals',
      'Schema.org Structured Data'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
