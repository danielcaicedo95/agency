'use client';

import { motion } from 'framer-motion';
import Logo from './Logo';

interface NavCardProps {
  title: string;
  href: string;
  color: string;
  description: string;
}

const NavCard = ({ title, href, color, description }: NavCardProps) => {
  return (
    <motion.div
      className={`${color} rounded-xl shadow-2xl hover:shadow-3xl transition-all p-6`}
      whileHover={{ scale: 1.05, rotate: 1 }} // Distorsión al hacer hover
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {/* Logo */}
        <Logo title={title} />
        {/* Título */}
        <h2 className="text-xl md:text-2xl font-bold text-white text-center mt-4">
          {title}
        </h2>
        {/* Texto corto */}
        <p className="text-sm md:text-base text-white text-center mt-2">
          {description}
        </p>
        {/* Botón para móviles */}
        <a
          href={href}
          className="mt-4 px-4 py-2 bg-white text-purple-900 rounded-lg shadow-md hover:bg-purple-100 transition-colors md:hidden"
        >
          Ver más
        </a>
      </div>
    </motion.div>
  );
};

export default NavCard;