'use client';

import { motion } from 'framer-motion';

const TransitionOverlay = ({ phase }: { phase: string }) => (
  <motion.div
    className="absolute inset-0 bg-vintage-blue z-50"
    initial={{ clipPath: 'circle(0% at 50% 50%)' }}
    animate={{ 
      clipPath: phase === 'transition' ? 
      'circle(150% at 50% 50%)' : 
      'circle(0% at 50% 50%)',
      transition: { 
        duration: 1.6,
        ease: 'circInOut'
      }
    }}
  />
);

export default TransitionOverlay;