'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoadingScreen from '@/app/components/loadingscreen/LoadingScreen';
import Navbar from '@/app/components/Navbar';
import NavCard from '@/app/components/NavCard';
import CityAnimation from '@/app/components/CityAnimation';
import UndergroundGrid from '@/app/components/UndergroundGrid';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();

  const cards = [
    {
      title: t.nav.work,
      href: '/work',
      description: t.work.subtitle,
    },
    {
      title: t.nav.services,
      href: '/services',
      description: t.skills.subtitle,
    },
    {
      title: t.nav.about,
      href: '/about',
      description: t.about.subtitle,
    },
    {
      title: t.nav.contact,
      href: '/contact',
      description: t.contact.subtitle,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-slate-950">
      {/* SCREEN DE CARGA INICIAL (OVERLAY FLUIDO) */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* NAVBAR */}
      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
      </div>

      {/* PRIMERA PANTALLA (HERO EQUILIBRADO CON VISTA LIMPIA A LA CIUDAD Y FACHADAS) */}
      <section className="relative w-full min-h-[88vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl border-b border-purple-900/40">
        {/* LA CIUDAD VIVA EN EL FONDO CON ALTA VISIBILIDAD */}
        <div className="absolute inset-0 z-0">
          <CityAnimation />
        </div>

        {/* CONTENIDO SUPERPUESTO (VIDRIO TRASLÚCIDO PARA NO TAPAR LA CIUDAD Y FACHADAS) */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-6 w-full flex-1 flex flex-col justify-between items-center text-center">
          {/* BADGE SALUDO */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-cyan-400/40 text-cyan-200 font-bold text-[11px] sm:text-xs tracking-wide uppercase shadow-xl mt-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {t.hero.greeting} {t.hero.name}
          </motion.div>

          {/* TITULAR PRINCIPAL - CONTRASTE LIMPIO */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl my-auto px-2">
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-200 tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.95 : 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {t.hero.role}
            </motion.h1>

            <motion.p
              className="max-w-xl mx-auto text-xs sm:text-base text-purple-100 font-medium leading-relaxed drop-shadow-md bg-slate-950/60 backdrop-blur-sm p-3 rounded-xl border border-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {t.hero.tagline}
            </motion.p>

            {/* BOTONES CTA */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/work"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                {t.hero.ctaWork} →
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-slate-950/70 text-cyan-300 border border-cyan-400/40 text-xs sm:text-sm font-bold rounded-xl shadow-md hover:bg-slate-900 transition-all backdrop-blur-md"
              >
                {t.hero.ctaContact}
              </Link>
            </motion.div>
          </div>

          {/* STRIP DE MÉTRICAS CON CRISTAL LIGERO (PERMITE VER LOS LOCALES DE LA CIUDAD DEBAJO) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-4xl w-full mb-1">
            {t.hero.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="p-2 sm:p-3 rounded-xl bg-slate-950/50 backdrop-blur-sm border border-purple-500/20 text-center shadow-lg hover:bg-slate-950/70 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
              >
                <div className="text-base sm:text-xl font-black text-cyan-300">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-xs font-medium text-slate-300 mt-0.5 leading-tight">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN PERFIL / MARCA PERSONAL ("MI FOTO PNG CON FONDO WEB NEÓN") */}
      <section className="relative w-full py-16 px-4 sm:px-6 bg-slate-950 border-b border-purple-900/30 overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* FOTO PNG SIN FONDO CON RETROILUMINACIÓN CIBERNÉTICA Y HALO NEÓN */}
          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[420px]">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-purple-600 via-cyan-400 to-fuchsia-500 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-400/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/80 via-purple-950/90 to-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] flex flex-col justify-end">
                <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-all" />

                <div className="relative w-full h-full z-10 flex items-end justify-center pt-4">
                  <Image
                    src="/daniel-caicedo-seo.png"
                    alt="Daniel Caicedo — SEO & AI Automation Specialist"
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    priority
                  />
                </div>

                <div className="relative z-20 m-3 p-2 bg-slate-950/85 backdrop-blur-md rounded-xl border border-purple-500/40 text-center shadow-xl">
                  <span className="text-xs font-mono font-bold text-cyan-300 tracking-widest">
                    DANIEL CAICEDO • SEO & AI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* INFORMACIÓN Y EXPERTISE DE DANIEL */}
          <motion.div
            className="md:col-span-7 space-y-5 text-center md:text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono tracking-wider uppercase">
              {language === 'es' ? 'Marca Personal & Liderazgo Tech' : 'Personal Brand & Tech Leadership'}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              {language === 'es' ? 'Especialista en Escalabilidad Digital' : 'Digital Scalability Specialist'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {language === 'es'
                ? 'Con más de 6 años de trayectoria optimizando ecosistemas web corporativos e e-commerce (Shopify Plus, VTEX), combino la precisión del SEO Técnico con la potencia de la Automatización con IA y SEM en Google Ads para convertir tráfico orgánico en ingresos sostenibles.'
                : 'With over 6 years of experience optimizing enterprise web ecosystems and e-commerce (Shopify Plus, VTEX), I combine Technical SEO precision with AI Automation and Google Ads SEM to turn organic traffic into sustainable revenue.'}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              {['SEO Técnico', 'Google Ads SEM', 'IA & Prompting', 'GA4 & GTM', 'Shopify Plus', 'VTEX'].map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-900 text-cyan-300 text-xs font-mono font-bold rounded-lg border border-purple-500/30"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
              <Link
                href="/about"
                className="px-6 py-3 bg-purple-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-purple-700 transition-all"
              >
                {language === 'es' ? 'Ver Trayectoria Completa' : 'View Full Experience'} →
              </Link>
              <a
                href="https://wa.me/573008061344"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900 text-cyan-300 border border-cyan-400/40 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-800 transition-colors"
              >
                WhatsApp Directo ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN SUBTERRÁNEA ("UNDERGROUND GRID") */}
      <UndergroundGrid>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {cards.map((card) => (
            <NavCard
              key={card.title}
              title={card.title}
              href={card.href}
              description={card.description}
            />
          ))}
        </div>
      </UndergroundGrid>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation Protocol
      </footer>
    </div>
  );
}