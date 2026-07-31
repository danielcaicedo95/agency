'use client';

import { useMemo } from 'react';

const SnakeLoader = ({ phase }: { phase: string }) => {
  const loaderItems = useMemo(() => [...Array(6)], []);
  const colors = ['#22d3ee', '#e879f9', '#c084fc', '#fde047', '#38bdf8', '#c084fc'];

  return phase === 'letters' ? (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-purple-500/40 shadow-2xl">
      {loaderItems.map((_, i) => (
        <div
          key={i}
          className="snake-loader"
          style={{ 
            animationDelay: `${i * 0.12}s`,
            backgroundColor: colors[i % colors.length]
          }}
        />
      ))}
    </div>
  ) : null;
};

export default SnakeLoader;