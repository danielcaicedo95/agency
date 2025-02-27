'use client';

import { motion } from 'framer-motion';
import { ReactElement, useMemo } from 'react';

const AnimatedLetters = ({ phase }: { phase: string }): ReactElement => {
  const letters = useMemo(() => 'AWWWRY'.split(''), []);

  return (
    <motion.div
      className="absolute inset-0 flex justify-center items-center z-30"
      animate={{ 
        y: phase === 'transition' ? -window.innerHeight / 2 : 0,
        transition: { 
          duration: 1.2,
          ease: [0.33, 1, 0.68, 1]
        }
      }}
    >
        
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block text-6xl md:text-9xl font-logo text-purple-900 tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
            initial={{ y: -800, rotate: -30, opacity: 0 }}
            animate={{
              y: 0,
              rotate: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                mass: 2.5,
                stiffness: 180,
                damping: 15,
                delay: i * 0.25
              }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedLetters;