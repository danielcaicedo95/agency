'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/work', label: t.nav.work },
    { href: '/services', label: t.nav.services },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-purple-500/20 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* LOGO 'DC' ORIGINAL EN FUENTE BUBBLE Y ESTILO LIMPIO */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="logo font-logo text-3xl sm:text-4xl font-black text-cyan-300 tracking-tighter drop-shadow-[0_4px_12px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
            DC
          </span>
          <span className="hidden sm:inline text-xs font-mono font-bold text-slate-300 tracking-wider">
            SEO • AI ENGINE
          </span>
        </Link>

        <nav className="flex items-center space-x-1 sm:space-x-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
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
      </div>
    </header>
  );
}
