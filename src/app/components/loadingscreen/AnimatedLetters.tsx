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
      className="absolute inset-0 flex justify-center items-center z-30"
      animate={{ 
        y: phase === 'transition' ? -windowHeight / 2 : 0,
        transition: { 
          duration: 1.2,
          ease: [0.33, 1, 0.68, 1]
        }
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="logo font-logo inline-block text-7xl md:text-9xl text-purple-900 tracking-normal drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
              initial={{ y: -800, scale: 0.5, rotate: -25, opacity: 0 }}
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
                  delay: i * 0.18
                }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="text-base md:text-2xl font-bold tracking-widest text-purple-950 uppercase bg-white/60 px-4 py-1 rounded-full shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          DANIEL CAICEDO — SEO • SEM • AI
        </motion.span>
      </div>
    </motion.div>
  );
};

export default AnimatedLetters;