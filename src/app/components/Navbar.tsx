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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-purple-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-logo text-2xl font-black text-purple-900 group-hover:scale-105 transition-transform">
            DC
          </span>
          <span className="hidden sm:inline text-xs font-semibold text-purple-800 tracking-wider">
            SEO & AI
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
                    ? 'text-purple-900 font-bold'
                    : 'text-gray-600 hover:text-purple-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-900 rounded-full"
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
