'use client';

import { useMemo } from 'react';

const SnakeLoader = ({ phase }: { phase: string }) => {
  const loaderItems = useMemo(() => [...Array(6)], []);

  return phase === 'letters' ? (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-4 z-50">
      {loaderItems.map((_, i) => (
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
  ) : null;
};

export default SnakeLoader;