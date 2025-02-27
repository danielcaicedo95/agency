'use client';

import { useState } from 'react';
import LoadingScreen from '@/app/components/loadingscreen/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import NavCard from '@/app/components/NavCard';
import '@/app/styles/fonts.css';

const navigationCards = [
  {
    title: 'Work',
    href: '/work',
    color: 'bg-vintage-blue',
    description: 'Explora nuestros proyectos más recientes.',
  },
  {
    title: 'Servicios',
    href: '/services',
    color: 'bg-soft-pink',
    description: 'Descubre lo que podemos hacer por ti.',
  },
  {
    title: 'Acerca de Nosotros',
    href: '/about',
    color: 'bg-vintage-blue',
    description: 'Conoce más sobre nuestro equipo.',
  },
  {
    title: 'Contacto',
    href: '/contact',
    color: 'bg-soft-pink',
    description: 'Ponte en contacto con nosotros.',
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-pale-pink">
      {/* LoadingScreen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Título del home */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="fixed top-4 left-0 w-full flex justify-center z-40"
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }}
          >
            <div className="flex flex-wrap justify-center gap-0.5 md:gap-1 font-logo tracking-tighter">
              {'AWWWRY'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-4xl md:text-6xl font-black text-purple-900 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                  initial={{ scale: 1.5, y: 100 }}
                  animate={{ 
                    scale: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 150,
                      damping: 12,
                      delay: i * 0.1
                    }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navegación */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-4 mx-auto min-h-screen items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {navigationCards.map((card, i) => (
              <NavCard
                key={card.title}
                title={card.title}
                href={card.href}
                color={card.color}
                description={card.description}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}