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
      <div className="flex flex-col items-center gap-3 px-4 relative">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {letters.map((letter, i) => {
            const letterDelay = i * 0.08;
            return (
              <div key={i} className="relative flex justify-center items-center">
                {/* EFECTO DE PANTALLA QUEBRADA / IMPACTO SHOCKWAVE EN CADA LETRA */}
                <motion.svg
                  viewBox="0 0 140 140"
                  className="absolute w-36 h-36 pointer-events-none z-0"
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    scale: [0.2, 1.3, 1.5, 1.8],
                  }}
                  transition={{
                    delay: letterDelay + 0.12,
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  {/* Onda expansiva de impacto */}
                  <circle cx="70" cy="70" r="45" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.6" />
                  <circle cx="70" cy="70" r="60" stroke="#e879f9" strokeWidth="1.5" fill="none" opacity="0.4" />

                  {/* Grietas de cristal neón en 8 direcciones */}
                  <line x1="70" y1="70" x2="10" y2="20" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="70" y1="70" x2="130" y2="15" stroke="#c084fc" strokeWidth="2" />
                  <line x1="70" y1="70" x2="135" y2="85" stroke="#22d3ee" strokeWidth="1.5" />
                  <line x1="70" y1="70" x2="110" y2="135" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="70" y1="70" x2="30" y2="130" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="70" y1="70" x2="5" y2="80" stroke="#c084fc" strokeWidth="2" />
                  <line x1="70" y1="70" x2="45" y2="5" stroke="#22d3ee" strokeWidth="2" />
                  <line x1="70" y1="70" x2="95" y2="138" stroke="#e879f9" strokeWidth="1.5" />

                  {/* Ramificaciones secundarias de la grieta */}
                  <path d="M 30,30 L 15,10 M 110,30 L 130,40 M 115,110 L 135,125 M 25,105 L 10,120" stroke="#22d3ee" strokeWidth="1" />
                </motion.svg>

                {/* LA LETRA QUE CAE E IMPACTA */}
                <motion.span
                  className="logo font-logo relative z-10 inline-block text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-300 to-fuchsia-400 tracking-normal drop-shadow-[0_10px_25px_rgba(34,211,238,0.6)]"
                  initial={{ y: -450, scale: 0.4, rotate: -15, opacity: 0 }}
                  animate={{
                    y: 0,
                    scale: 1,

                    rotate: 0,
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      mass: 1.2,
                      stiffness: 240,
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

        <motion.span
          className="text-xs sm:text-base md:text-xl font-extrabold tracking-widest text-cyan-200 uppercase bg-slate-950/80 backdrop-blur-md px-6 py-2 rounded-full border border-purple-500/50 shadow-xl mt-2"
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