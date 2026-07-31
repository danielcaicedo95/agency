'use client';

import { motion } from 'framer-motion';
import { ReactElement, useMemo, useState, useEffect } from 'react';

const AnimatedLetters = ({ phase }: { phase: string }): ReactElement => {
  const letters = useMemo(() => 'GROWTH'.split(''), []);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex justify-center items-center z-30 pointer-events-none"
      animate={{ 
        y: phase === 'transition' ? -windowHeight / 2 : 0,
        opacity: phase === 'transition' ? 0 : 1,
        transition: { 
          duration: 1,
          ease: [0.33, 1, 0.68, 1]
        }
      }}
    >
      <div className="flex flex-col items-center gap-4 px-4 py-8 relative max-w-full overflow-visible">
        {/* CONTENEDOR DE LETRAS CON SUFICIENTE PADDING PARA EVITAR CORTES */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 py-6 px-4 overflow-visible">
          {letters.map((letter, i) => {
            const letterDelay = i * 0.08;
            return (
              <div key={i} className="relative flex justify-center items-center overflow-visible">
                {/* EFECTO DE ONDA EXPASSIVA NEÓN SUTIL (NO OPACA LAS LETRAS) */}
                <motion.svg
                  viewBox="0 0 120 120"
                  className="absolute w-28 h-28 pointer-events-none z-0 opacity-40"
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0.3, 1.1],
                  }}
                  transition={{
                    delay: letterDelay + 0.1,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                >
                  <circle cx="60" cy="60" r="40" stroke="#22d3ee" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <line x1="60" y1="60" x2="10" y2="10" stroke="#c084fc" strokeWidth="1" />
                  <line x1="60" y1="60" x2="110" y2="10" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="60" y1="60" x2="110" y2="110" stroke="#f472b6" strokeWidth="1" />
                  <line x1="60" y1="60" x2="10" y2="110" stroke="#22d3ee" strokeWidth="1" />
                </motion.svg>

                {/* LA LETRA 'GROWTH' COMPLETA Y SIN CORTES */}
                <motion.span
                  className="logo font-logo relative z-10 inline-block text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-purple-300 to-fuchsia-400 leading-snug py-2 px-1 tracking-normal overflow-visible drop-shadow-[0_8px_20px_rgba(34,211,238,0.5)]"
                  initial={{ y: -400, scale: 0.5, rotate: -12, opacity: 0 }}
                  animate={{
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      mass: 1.2,
                      stiffness: 220,
                      damping: 14,
                      delay: letterDelay,
                    },
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* SUBTÍTULO DE MARCA PERSONAL */}
        <motion.span
          className="text-xs sm:text-base md:text-lg font-extrabold tracking-widest text-cyan-200 uppercase bg-slate-950/80 backdrop-blur-md px-6 py-2 rounded-full border border-purple-500/50 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          DANIEL CAICEDO — SEO • SEM • AI
        </motion.span>
      </div>
    </motion.div>
  );
};

export default AnimatedLetters;