'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLetters from './AnimatedLetters';
import SnakeLoader from './SnakeLoader';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'letters' | 'transition' | 'complete'>('letters');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('transition');
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 800);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'transition' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* LETRAS BURBUJA Y BARRA DE PROGRESO NEÓN */}
          <AnimatedLetters phase={phase} />
          <SnakeLoader phase={phase} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;