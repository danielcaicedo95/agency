'use client';

import { useEffect, useState, useMemo, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/app/styles/fonts.css';

interface WaveConfig {
  id: number;
  width: number;
  height: string;
  left: number;
  top: number;
  rotate: number;
  delay: number;
}

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'letters' | 'transition' | 'complete'>('letters');
  
  // Optimización 1: Generación determinista de waves
  const waves = useMemo(() => 
    Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45) % 360;
      return {
        id: i,
        width: 30 + (i * 4),
        height: '45vh',
        left: (i * 12.5) % 100,
        top: 20 + (i * 10) % 60,
        rotate: angle,
        delay: i * 0.15
      };
    }), []);

  // Optimización 2: Eliminado estado mounted innecesario
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setPhase('transition');
        setTimeout(() => {
          startTransition(() => {
            setPhase('complete');
            onComplete();
          });
        }, 1800); // Reducido de 2000
      });
    }, 3500); // Reducido de 4000
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Optimización 3: Animaciones CSS para elementos repetitivos
  const letters = useMemo(() => 'Awwwry'.split(''), []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {phase !== 'complete' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Olas optimizadas con cálculo determinista */}
            {waves.map((wave) => (
              <motion.div
                key={wave.id}
                className="absolute bg-vintage-blue opacity-75"
                style={{
                  width: `${wave.width}%`,
                  height: wave.height,
                  borderRadius: '40% 60%',
                  left: `${wave.left}%`,
                  top: `${wave.top}%`,
                  rotate: wave.rotate,
                  willChange: 'transform, opacity'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: phase === 'letters' ? 2.8 : 0,
                  opacity: phase === 'letters' ? 1 : 0,
                  transition: {
                    type: 'spring',
                    stiffness: 25,
                    damping: 12,
                    delay: wave.delay
                  }
                }}
              />
            ))}

            {/* Letras con animación optimizada */}
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
                        delay: i * 0.25 // Reducido de 0.3
                      }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Loader optimizado con CSS nativo */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-4 z-50">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="snake-loader"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    backgroundColor: i % 2 ? '#F3A4B5' : '#A8D0E6'
                  }}
                />
              ))}
            </div>

            {/* Transición final acelerada */}
            <motion.div
              className="absolute inset-0 bg-vintage-blue z-50"
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ 
                clipPath: phase === 'transition' ? 
                'circle(150% at 50% 50%)' : 
                'circle(0% at 50% 50%)',
                transition: { 
                  duration: 1.6, // Reducido de 2
                  ease: 'circInOut'
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estilos críticos inlined */}
      <style jsx global>{`
        .snake-loader {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          animation: snake 1.4s infinite ease-in-out;
          will-change: transform, background-color;
        }
        
        @keyframes snake {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            background-color: #fff;
          }
          30% { 
            transform: translateY(-20px) scale(1.3);
            background-color: #F3A4B5;
          }
          60% {
            transform: translateY(10px) scale(0.9);
            background-color: #A8D0E6;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .snake-loader {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;