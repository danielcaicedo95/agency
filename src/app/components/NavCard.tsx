'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

interface NavCardProps {
  title: string;
  href: string;
  color?: string;
  description: string;
}

const NavCard = ({ title, href, description }: NavCardProps) => {
  return (
    <Link href={href} className="block group h-full">
      <motion.div
        className="relative bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 h-full border border-purple-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/20 flex flex-col justify-between overflow-hidden group-hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        {/* Destello sutil de neón en la esquina al hacer hover */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all" />
        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/25 transition-all" />

        <div className="relative z-10 flex flex-col items-start text-left">
          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-purple-500/30 shadow-inner mb-5 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
            <Logo title={title} />
          </div>

          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300 group-hover:from-cyan-300 group-hover:to-fuchsia-400 transition-all">
            {title}
          </h2>

          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 group-hover:text-cyan-200">
          <span>{title.toUpperCase()} PROTOCOL</span>
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            EXPLORAR ↗
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default NavCard;