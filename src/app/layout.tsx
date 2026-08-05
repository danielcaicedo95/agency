import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/app/context/LanguageContext';
import JsonLd from '@/app/components/JsonLd';
import SEOMetadata from '@/app/components/SEOMetadata';

const inter = Inter({ subsets: ['latin'] });

const miFuenteLogo = localFont({
  src: './fonts/BILLO.woff2',
  variable: '--fuente-logo',
});

export const metadata: Metadata = {
  title: 'Daniel Caicedo | Especialista SEO, SEM & Automatización IA',
  description: 'Portafolio Profesional de Daniel Caicedo: Experto en SEO Técnico, E-commerce (Shopify, VTEX), campañas Google Ads, Analítica Web (GA4, GTM) y Automatización con Inteligencia Artificial.',
  keywords: ['SEO Specialist', 'SEM Specialist', 'Automatización IA', 'GA4', 'GTM', 'Technical SEO', 'Shopify Plus SEO', 'VTEX SEO', 'Google Ads', 'Daniel Caicedo'],
  authors: [{ name: 'Daniel Caicedo' }],
  openGraph: {
    title: 'Daniel Caicedo | Especialista SEO, SEM & Automatización IA',
    description: 'Incrementando tráfico orgánico y conversiones con SEO técnico, analítica avanzada y automatización IA.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.className} ${miFuenteLogo.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-slate-950 bg-slate-950 text-slate-100">
        <LanguageProvider>
          <SEOMetadata />
          <main className="min-h-screen">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}