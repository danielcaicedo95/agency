'use client';

import { useState } from 'react';
import LoadingScreen from '@/app/components/loadingscreen/LoadingScreen';
import Navbar from '@/app/components/Navbar';
import NavCard from '@/app/components/NavCard';
import CityAnimation from '@/app/components/CityAnimation';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();

  const cards = [
    {
      title: t.nav.work,
      href: '/work',
      color: 'bg-vintage-blue',
      description: t.work.subtitle,
    },
    {
      title: t.nav.services,
      href: '/services',
      color: 'bg-soft-pink',
      description: t.skills.subtitle,
    },
    {
      title: t.nav.about,
      href: '/about',
      color: 'bg-vintage-blue',
      description: t.about.subtitle,
    },
    {
      title: t.nav.contact,
      href: '/contact',
      color: 'bg-soft-pink',
      description: t.contact.subtitle,
    },
  ];

  return (
    <div className="min-h-screen bg-pale-pink/40 text-slate-900 flex flex-col">
      {/* Screen de carga inicial */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />

          {/* PRIMERA PANTALLA (HERO CON ANIMACIÓN DE CIUDAD E INTERACTIVA) */}
          <section className="relative w-full h-[85vh] sm:h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl border-b border-purple-900/30">
            {/* CIUDAD DE FONDO EN VIVO */}
            <div className="absolute inset-0 z-0">
              <CityAnimation />
            </div>

            {/* CONTENIDO SUPERPUESTO (TITULAR, MÉTRICAS Y CTAS) */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 w-full flex-1 flex flex-col justify-between items-center text-center">
              {/* BADGE SALUDO */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.hero.greeting} {t.hero.name}
              </motion.div>

              {/* TITULAR E IMPACTO */}
              <div className="space-y-4 max-w-4xl my-auto">
                <motion.h1
                  className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {t.hero.role}
                </motion.h1>

                <motion.p
                  className="max-w-2xl mx-auto text-base sm:text-xl text-purple-100 font-medium leading-relaxed drop-shadow-md bg-purple-950/60 backdrop-blur-md p-4 rounded-2xl border border-purple-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {t.hero.tagline}
                </motion.p>

                {/* BOTONES CTA */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-4 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/work"
                    className="px-7 py-3.5 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-purple-500/50 transition-all transform hover:-translate-y-0.5"
                  >
                    {t.hero.ctaWork} →
                  </Link>
                  <Link
                    href="/contact"
                    className="px-7 py-3.5 bg-white/90 text-purple-950 border-2 border-purple-300 font-bold rounded-xl shadow-md hover:bg-white transition-all transform hover:-translate-y-0.5 backdrop-blur-md"
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
                    className="p-3.5 rounded-2xl bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-center shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <div className="text-xl sm:text-2xl font-black text-purple-300">
                      {metric.value}
                    </div>
                    <div className="text-xs font-medium text-purple-100 mt-0.5">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTENIDO SECUNDARIO (TARJETAS DE NAVEGACIÓN Y SECCIONES) */}
          <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-purple-950">
                {language === 'es' ? 'Explora el Portafolio' : 'Explore Portfolio'}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {language === 'es'
                  ? 'Selecciona una sección para ver mi experiencia, habilidades y proyectos'
                  : 'Select a section to view experience, skills and projects'}
              </p>
            </div>

            <motion.section
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {cards.map((card) => (
                <NavCard
                  key={card.title}
                  title={card.title}
                  href={card.href}
                  color={card.color}
                  description={card.description}
                />
              ))}
            </motion.section>
          </main>

          <footer className="w-full py-6 text-center text-xs text-purple-950/60 font-medium">
            © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
          </footer>
        </>
      )}
    </div>
  );
}