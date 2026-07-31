'use client';

import { useState } from 'react';
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
  const { t } = useLanguage();


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

      {/* PRIMERA PANTALLA (HERO CON CIUDAD EN CONSTRUCCIÓN Y MÉTRICAS) */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl border-b border-purple-900/40">
        {/* LA CIUDAD VIVA EN EL FONDO */}
        <div className="absolute inset-0 z-0">
          <CityAnimation />
        </div>

        {/* CONTENIDO SUPERPUESTO */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 w-full flex-1 flex flex-col justify-between items-center text-center">
          {/* BADGE SALUDO */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-200 font-bold text-xs sm:text-sm tracking-wide uppercase shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            {t.hero.greeting} {t.hero.name}
          </motion.div>

          {/* TITULAR E IMPACTO */}
          <div className="space-y-4 max-w-4xl my-auto">
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-200 tracking-tight leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.9 : 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {t.hero.role}
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto text-base sm:text-xl text-purple-100 font-medium leading-relaxed drop-shadow-md bg-slate-950/75 backdrop-blur-md p-4 rounded-2xl border border-purple-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {t.hero.tagline}
            </motion.p>

            {/* BOTONES CTA */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/work"
                className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                {t.hero.ctaWork} →
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-slate-900/90 text-cyan-300 border border-cyan-400/40 font-bold rounded-xl shadow-md hover:bg-slate-800 hover:border-cyan-300 transition-all backdrop-blur-md"
              >
                {t.hero.ctaContact}
              </Link>
            </motion.div>
          </div>

          {/* STRIP DE MÉTRICAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl w-full">
            {t.hero.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-purple-500/40 text-center shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
              >
                <div className="text-xl sm:text-2xl font-black text-cyan-300">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN SUBTERRÁNEA ("BAJO LA ALCANTARILLA / UNDERGROUND GRID") */}
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