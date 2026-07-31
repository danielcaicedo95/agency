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
      <div className="flex flex-col items-center gap-3 px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="logo font-logo inline-block text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-300 to-fuchsia-400 tracking-normal drop-shadow-[0_10px_20px_rgba(168,85,247,0.5)]"
              initial={{ y: -600, scale: 0.4, rotate: -20, opacity: 0 }}
              animate={{
                y: 0,
                scale: 1,
                rotate: 0,
                opacity: 1,
                transition: {
                  type: 'spring',
                  mass: 2,
                  stiffness: 160,
                  damping: 12,
                  delay: i * 0.15
                }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="text-xs sm:text-base md:text-xl font-extrabold tracking-widest text-cyan-200 uppercase bg-slate-950/80 backdrop-blur-md px-6 py-2 rounded-full border border-purple-500/50 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          DANIEL CAICEDO — SEO • SEM • AI
        </motion.span>
      </div>
    </motion.div>
  );
};

export default AnimatedLetters;