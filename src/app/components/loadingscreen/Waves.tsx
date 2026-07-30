'use client';

import { motion } from 'framer-motion';

const Waves = ({ phase }: { phase: string }) => {
  const waves = [
    { id: 1, width: '38%', left: '12.5%', top: '20%', rotate: 45 },
    { id: 2, width: '42%', left: '30%', top: '30%', rotate: 90 },
    { id: 3, width: '46%', left: '50%', top: '40%', rotate: 135 },
    { id: 4, width: '50%', left: '70%', top: '30%', rotate: 180 },
    { id: 5, width: '54%', left: '87.5%', top: '20%', rotate: 225 },
  ];

  return (
    <>
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute bg-vintage-blue/75 h-[45vh] rounded-[40%_60%] origin-center will-change-transform pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: phase === 'letters' ? 2.8 : 0,
            opacity: phase === 'letters' ? 1 : 0,
            transition: {
              type: 'tween',
              ease: 'easeOut',
              duration: 0.8,
              delay: wave.id * 0.1
            }
          }}
          style={{
            width: wave.width,
            left: wave.left,
            top: wave.top,
            transform: `rotate(${wave.rotate}deg)`
          }}
        />
      ))}
    </>
  );
};

export default Waves;