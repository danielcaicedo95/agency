'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const prefix = language === 'en' ? '/en' : '';

  const links = [
    { href: `${prefix}/`, label: t.nav.home },
    { href: `${prefix}/work`, label: t.nav.work },
    { href: `${prefix}/services`, label: t.nav.services },
    { href: `${prefix}/about`, label: t.nav.about },
    { href: `${prefix}/contact`, label: t.nav.contact },
  ];

  // For active detection, strip /en from pathname for comparison
  const normPath = pathname?.startsWith('/en') ? pathname.replace(/^\/en/, '') || '/' : pathname;


  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-purple-500/20 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* LOGO 'DC' ORIGINAL EN FUENTE BUBBLE */}
        <Link href={prefix + '/'} className="flex items-center gap-2 sm:gap-3 group">
          <span className="logo font-logo text-3xl sm:text-4xl font-black text-cyan-300 tracking-tighter drop-shadow-[0_4px_12px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
            DC
          </span>
          <span className="hidden sm:inline text-xs font-mono font-bold text-slate-300 tracking-wider">
            SEO • AI ENGINE
          </span>
        </Link>

        {/* NAVEGACIÓN DESKTOP (PANTALLAS MEDIANAS Y GRANDES) */}
        <nav className="hidden md:flex items-center space-x-2">
          {links.map((link) => {
            const normLink = link.href.replace(/^\/en/, '') || '/';
            const isActive = normPath === normLink;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* PARTE DERECHA: CAMBIADOR DE IDIOMA Y BOTÓN HAMBURGUESA MÓVIL */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CAMBIADOR DE IDIOMA INTEGRAD O CON BANDERAS */}
          <LanguageSwitcher />

          {/* BOTÓN MENÚ HAMBURGUESA EN MÓVIL */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-purple-500/30 text-cyan-300 hover:bg-slate-800 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE EN MÓVIL (DESPLIEGUE FLUIDO CIBERNÉTICO) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-2xl border-b border-purple-500/30 px-4 py-4 space-y-2 shadow-2xl"
          >
            {links.map((link) => {
              const normLink = link.href.replace(/^\/en/, '') || '/';
              const isActive = normPath === normLink;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-900/60 to-cyan-950/60 text-cyan-300 border border-cyan-400/40 shadow-lg'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
