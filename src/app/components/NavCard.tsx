'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

interface NavCardProps {
  title: string;
  href: string;
  color: string;
  description: string;
}

const NavCard = ({ title, href, color, description }: NavCardProps) => {
  return (
    <Link href={href} className="block group h-full">
      <motion.div
        className={`${color} rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 md:p-8 h-full border border-white/40 flex flex-col justify-between`}
        whileHover={{ scale: 1.03, y: -4 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-white/60 rounded-2xl shadow-inner mb-4 group-hover:scale-110 transition-transform">
            <Logo title={title} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-purple-950 mt-2">
            {title}
          </h2>
          <p className="text-sm text-purple-900/80 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-950 group-hover:translate-x-1 transition-transform">
          <span>Explorar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
};

export default NavCard;