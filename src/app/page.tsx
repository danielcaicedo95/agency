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

      {/* PRIMERA PANTALLA (HERO LIMPIO Y ADAPTADO A MÓVIL) */}
      <section className="relative w-full h-[88vh] sm:h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl border-b border-purple-900/40">
        {/* LA CIUDAD VIVA EN EL FONDO */}
        <div className="absolute inset-0 z-0">
          <CityAnimation />
        </div>

        {/* CONTENIDO SUPERPUESTO (LIGERO Y DESPEJADO EN MÓVIL) */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-8 w-full flex-1 flex flex-col justify-between items-center text-center">
          {/* BADGE SALUDO */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-400/40 text-cyan-200 font-bold text-[11px] sm:text-sm tracking-wide uppercase shadow-xl mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            {t.hero.greeting} {t.hero.name}
          </motion.div>

          {/* TITULAR PRINCIPAL - TAMAÑO LIMPIO EN MÓVIL */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl my-auto px-2">
            <motion.h1
              className="text-3xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-200 tracking-tight leading-tight sm:leading-tight drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.95 : 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {t.hero.role}
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto text-xs sm:text-lg text-purple-100 font-medium leading-relaxed drop-shadow-md bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-purple-500/30"
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
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs sm:text-base font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                {t.hero.ctaWork} →
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-slate-900/90 text-cyan-300 border border-cyan-400/40 text-xs sm:text-base font-bold rounded-xl shadow-md hover:bg-slate-800 hover:border-cyan-300 transition-all backdrop-blur-md"
              >
                {t.hero.ctaContact}
              </Link>
            </motion.div>
          </div>

          {/* STRIP DE MÉTRICAS - COMPACTO Y COMPACTADO EN MÓVIL */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-4xl w-full">
            {t.hero.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950/85 backdrop-blur-md border border-purple-500/40 text-center shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
              >
                <div className="text-lg sm:text-2xl font-black text-cyan-300">
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

      {/* SECCIÓN PERFIL / MARCA PERSONAL ("MI FOTO") */}
      <section className="relative w-full py-16 px-4 sm:px-6 bg-slate-950 border-b border-purple-900/30 overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* FOTO DE PERFIL CON MARCO NEÓN DE ALTA ESTÉTICA */}
          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              {/* Resplandor neón animado de fondo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-cyan-400 to-fuchsia-500 blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              {/* Contenedor de la foto */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-400/50 bg-slate-900 shadow-2xl">
                <Image
                  src="/daniel_profile.png"
                  alt="Daniel Caicedo — SEO & AI Automation Specialist"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                {/* Overlay de gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl border border-purple-500/30 text-center">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    DANIEL CAICEDO
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

            {/* BADGES DE TECNOLOGÍAS CLAVE */}
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

            {/* BOTONES DE CONTACTO DIRECTO */}
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