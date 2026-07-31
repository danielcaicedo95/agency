'use client';

import { motion } from 'framer-motion';
import { ReactElement, useMemo, useState, useEffect } from 'react';

const AnimatedLetters = ({ phase }: { phase: string }): ReactElement => {
  const letters = useMemo(() => 'GROWTH'.split(''), []);
  const [windowHeight, setWindowHeight] = useState(800);

  // Configuraciones únicas de rebote individual para cada letra (diferentes inclinaciones y físicas de resorte)
  const letterConfigs = useMemo(() => [
    { initialRotate: -22, stiffness: 320, damping: 8, mass: 1.1, yDrop: -420 }, // G: Gran rebote resorte
    { initialRotate: 16,  stiffness: 250, damping: 10, mass: 0.9, yDrop: -360 }, // R: Giro elástico
    { initialRotate: -12, stiffness: 290, damping: 7, mass: 1.2, yDrop: -440 }, // O: Alto impacto
    { initialRotate: 18,  stiffness: 230, damping: 9, mass: 1.0, yDrop: -380 }, // W: Rebote pesado
    { initialRotate: -15, stiffness: 340, damping: 10, mass: 0.8, yDrop: -400 }, // T: Caída rápida y precisa
    { initialRotate: 12,  stiffness: 270, damping: 8, mass: 1.1, yDrop: -430 }, // H: Remate juguetón
  ], []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex justify-center items-center z-30 pointer-events-none px-2"
      animate={{ 
        y: phase === 'transition' ? -windowHeight / 2 : 0,
        opacity: phase === 'transition' ? 0 : 1,
        transition: { 
          duration: 1,
          ease: [0.33, 1, 0.68, 1]
        }
      }}
    >
      <div className="flex flex-col items-center gap-3 relative max-w-full overflow-visible">
        {/* LETRAS 'GROWTH' CON REBOTE INDIVIDUAL PERSONALIZADO */}
        <div className="flex justify-center items-center gap-1 sm:gap-3 md:gap-6 py-2 px-1 overflow-visible">
          {letters.map((letter, i) => {
            const letterDelay = i * 0.08;
            const config = letterConfigs[i % letterConfigs.length];

            return (
              <div key={i} className="relative flex justify-center items-center overflow-visible">
                {/* EFECTO DE ONDA NEÓN SUTIL Y COMPACTO EN MÓVIL */}
                <motion.svg
                  viewBox="0 0 120 120"
                  className="absolute w-16 h-16 sm:w-24 sm:h-24 pointer-events-none z-0 opacity-35"
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0.3, 1.2],
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
                </motion.svg>

                {/* LETRA BUBBLE CON REBOTE NATIVO INDIVIDUALIZADO */}
                <motion.span
                  className="logo font-logo relative z-10 inline-block text-4xl sm:text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-purple-300 to-fuchsia-400 leading-none py-1 px-0.5 tracking-tight overflow-visible drop-shadow-[0_6px_20px_rgba(34,211,238,0.6)]"
                  initial={{
                    y: config.yDrop,
                    scale: 0.4,
                    rotate: config.initialRotate,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      mass: config.mass,
                      stiffness: config.stiffness,
                      damping: config.damping,
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

        {/* SUBTÍTULO COMPACTO Y ELEGANTE */}
        <motion.span
          className="text-[10px] sm:text-xs md:text-base font-extrabold tracking-widest text-cyan-200 uppercase bg-slate-950/90 backdrop-blur-md px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-purple-500/50 shadow-xl text-center max-w-[90vw]"
          initial={{ opacity: 0, y: 15 }}
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