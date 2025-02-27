'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Waves from './Waves';
import AnimatedLetters from './AnimatedLetters';
import SnakeLoader from './SnakeLoader';
import TransitionOverlay from './TransitionOverlay';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'letters' | 'transition' | 'complete'>('letters');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('transition');
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 1800);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {phase !== 'complete' && (
          <div className="absolute inset-0">
            <Waves phase={phase} />
            
            <AnimatedLetters phase={phase} />
            
            <SnakeLoader phase={phase} />
            
            <TransitionOverlay phase={phase} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;