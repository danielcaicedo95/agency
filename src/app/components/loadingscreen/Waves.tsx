'use client';

import { motion } from 'framer-motion';

const Waves = ({ phase }: { phase: string }) => {
  // Reducir a 5 elementos y posiciones precalculadas
  const waves = [
    { id: 1, width: 38, left: 12.5, top: 20, rotate: 45 },
    { id: 2, width: 42, left: 30, top: 30, rotate: 90 },
    { id: 3, width: 46, left: 50, top: 40, rotate: 135 },
    { id: 4, width: 50, left: 70, top: 30, rotate: 180 },
    { id: 5, width: 54, left: 87.5, top: 20, rotate: 225 },
  ];

  return (
    <>
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="wave-optimized"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: phase === 'letters' ? 2.8 : 0,
            opacity: phase === 'letters' ? 1 : 0,
            transition: {
              type: 'tween', // Más eficiente que spring
              ease: 'easeOut',
              duration: 0.8,
              delay: wave.id * 0.1
            }
          }}
          style={{
            '--width': `${wave.width}%`,
            '--left': `${wave.left}%`,
            '--top': `${wave.top}%`,
            '--rotate': `${wave.rotate}deg`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
};

// Estilos en CSS puro para mejor rendimiento
<style jsx global>{`
  .wave-optimized {
    position: absolute;
    background: theme('colors.vintage-blue');
    opacity: 0.75;
    height: 45vh;
    border-radius: 40% 60%;
    transform-origin: center;
    will-change: transform, opacity;
    
    width: var(--width);
    left: var(--left);
    top: var(--top);
    transform: 
      translateZ(0) /* Aceleración hardware */
      rotate(var(--rotate)) 
      scale(var(--scale));
  }

  @media (prefers-reduced-motion: reduce) {
    .wave-optimized {
      transition: none !important;
      animation: none !important;
    }
  }
`}</style>

export default Waves;