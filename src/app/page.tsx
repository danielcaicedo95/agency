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

          {/* STRIP DE MÉTRICAS CON CRISTAL LIGERO */}
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

      {/* SECCIÓN MARCA PERSONAL CON CONEXIÓN DE ALCANTARILLADO Y TUBERÍAS DE DATOS */}
      <section className="relative w-full py-16 px-4 sm:px-6 bg-slate-950 border-b border-purple-900/30 overflow-hidden">
        {/* ========================================================= */}
        {/* SISTEMA VISUAL DE ALCANTARILLADO Y TUBERÍAS DE DATOS NEÓN */}
        {/* ========================================================= */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {/* TAPA DE ALCANTARILLA EN EL LÍMITE SUPERIOR (CONEXIÓN CON LA CALLE) */}
            <g transform="translate(600, 0)">
              {/* Resplandor interior de la alcantarilla */}
              <circle cx="0" cy="24" r="28" fill="#22d3ee" opacity="0.3" filter="blur(6px)" />
              {/* Tapa de hierro de la alcantarilla semiabierta */}
              <circle cx="0" cy="20" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <circle cx="0" cy="20" r="16" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" />
              <text x="0" y="23" fill="#38bdf8" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                SEO SEWER
              </text>
              
              {/* DETALLE DIVERTIDO: RATITA CIBERNÉTICA CON LUZ PARPADECIENTE EN LA ALCANTARILLA 🐀 */}
              <g transform="translate(24, 10)">
                <ellipse cx="6" cy="6" rx="6" ry="4" fill="#64748b" />
                <circle cx="10" cy="4" r="3" fill="#94a3b8" />
                <circle cx="11" cy="3" r="1" fill="#ef4444" /> {/* Ojo neón rojo */}
                <line x1="0" y1="6" x2="-6" y2="8" stroke="#64748b" strokeWidth="1" /> {/* Cola */}
                <text x="14" y="2" fill="#fde047" fontSize="7" fontWeight="bold">🐀 ⚡</text>
              </g>
            </g>

            {/* TUBERÍAS DE DATOS NEÓN QUE DESCIENDEN DESDE LA ALCANTARILLA HASTA DETRÁS DE LA FOTO */}
            {/* Tubería Cyan */}
            <motion.path
              d="M 600,20 C 500,80 320,120 260,220 C 220,290 260,380 300,500 L 300,600"
              fill="none" stroke="#22d3ee" strokeWidth="3" strokeOpacity="0.7"
            />
            <motion.path
              d="M 600,20 C 500,80 320,120 260,220 C 220,290 260,380 300,500 L 300,600"
              fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="8 20"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Tubería Púrpura/Magenta */}
            <motion.path
              d="M 600,20 C 680,100 480,180 380,260 C 310,320 340,440 420,550 L 420,600"
              fill="none" stroke="#e879f9" strokeWidth="2.5" strokeOpacity="0.6"
            />
            <motion.path
              d="M 600,20 C 680,100 480,180 380,260 C 310,320 340,440 420,550 L 420,600"
              fill="none" stroke="#fde047" strokeWidth="1" strokeDasharray="6 18"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Tubería Secundaria de Entrada a la Tarjeta de Foto */}
            <path d="M 260,220 L 320,220" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="320" cy="220" r="4" fill="#fde047" />
          </svg>
        </div>

        {/* CONTENIDO DE LA SECCIÓN MARCA PERSONAL */}
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* TARJETA POLAROID DE DANIEL CONECTADA A LA TUBERÍA SUBTERRÁNEA DE DATOS */}
          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {/* TARJETA POLAROID POP-ART COMPACTA Y DESFADADA */}
            <div className="relative group w-52 h-64 sm:w-60 sm:h-72 bg-slate-100 text-slate-900 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(34,211,238,0.3)] border-4 border-yellow-300 flex flex-col justify-between overflow-visible transform transition-transform duration-300">
              
              {/* ENCHUFE NEÓN DE CONEXIÓN CON LA ALCANTARILLA EN EL LATERAL */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-slate-950 text-cyan-300 text-[9px] font-mono font-bold px-1.5 py-1 rounded border border-cyan-400 shadow-lg flex items-center gap-1 z-30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                SEO FEED
              </div>

              {/* CINTA ADHESIVA NEÓN EN LA ESQUINA */}
              <div className="absolute -top-3 left-4 bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-sm shadow-md -rotate-6 z-30 border border-slate-900">
                YES, IT&apos;S ME! ✌️
              </div>

              {/* MARCO DE FOTO POP-UP INTERNO */}
              <div className="relative w-full h-[82%] bg-gradient-to-b from-purple-900 to-slate-950 rounded-xl overflow-hidden border-2 border-slate-900 flex items-end justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/40 via-purple-600/30 to-transparent" />
                
                <div className="relative w-full h-full z-10">
                  <Image
                    src="/daniel-caicedo-seo.png"
                    alt="Daniel Caicedo — SEO & AI Automation Specialist"
                    fill
                    className="object-contain object-bottom group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* PIE DE POLAROID MANUSCRITO / MANIFIESTO COOL */}
              <div className="text-center pt-1 font-mono font-bold text-xs text-slate-950 tracking-tight flex items-center justify-between px-1">
                <span>DANIEL C. ⚡</span>
                <span className="text-[10px] bg-yellow-300 px-1.5 py-0.5 rounded text-slate-950 font-black">
                  SEO & AI
                </span>
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