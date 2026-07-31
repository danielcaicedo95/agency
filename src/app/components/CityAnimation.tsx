'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface BuildingSign {
  text: string;
  subtext: string;
  icon: string;
  neonColor: string;
  textColor: string;
}

interface Building {
  id: number;
  x: number;
  width: number;
  height: number;
  color: string;
  windows: { wx: number; wy: number; isFlickering: boolean; blinkDelay: number }[];
  delay: number;
  hasAntenna: boolean;
  sign?: BuildingSign;
}

export default function CityAnimation() {
  const buildings = useMemo<Building[]>(() => {
    const colors = [
      '#3b0764', '#4c1d95', '#581c87', '#6b21a8',
      '#312e81', '#1e1b4b', '#4338ca', '#5b21b6',
      '#2e1065', '#4f46e5', '#3730a3', '#6d28d9',
    ];

    const signsMap: { [key: number]: BuildingSign } = {
      1: { text: 'TOYOTA', subtext: 'DEALERSHIP', icon: '🚗', neonColor: '#ef4444', textColor: '#fca5a5' },
      4: { text: 'FASHION', subtext: 'STORE', icon: '🛍️', neonColor: '#e879f9', textColor: '#f0abfc' },
      7: { text: 'BAR & LOUNGE', subtext: 'GASTROBAR', icon: '🍸', neonColor: '#22d3ee', textColor: '#a5f3fc' },
      10: { text: 'HEALTHCARE', subtext: 'INSURANCE', icon: '🏥', neonColor: '#4ade80', textColor: '#bbf7d0' },
      13: { text: 'LEGAL TECH', subtext: 'SERVICES', icon: '⚖️', neonColor: '#fde047', textColor: '#fef08a' },
    };

    const bldgs: Building[] = [];
    let xPos = 0;
    let id = 0;

    while (xPos < 1400) {
      const w = 38 + Math.floor((id * 37 + 13) % 52);
      const h = 115 + Math.floor((id * 73 + 29) % 225);
      const gap = 4 + Math.floor((id * 11) % 5);
      const color = colors[id % colors.length];
      const hasAntenna = id % 3 === 0;

      const windows: { wx: number; wy: number; isFlickering: boolean; blinkDelay: number }[] = [];
      const cols = Math.floor(w / 14);
      const rows = Math.floor(h / 20);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if ((id + r + c) % 3 !== 0) {
            windows.push({
              wx: 6 + c * 13,
              wy: 14 + r * 18,
              isFlickering: (r + c + id) % 2 === 0,
              blinkDelay: (id * 0.7 + r * 0.3 + c * 0.2) % 4,
            });
          }
        }
      }

      bldgs.push({
        id,
        x: xPos,
        width: w,
        height: h,
        color,
        windows,
        delay: 0.14 * id,
        hasAntenna,
        sign: signsMap[id],
      });

      xPos += w + gap;
      id++;
    }

    return bldgs;
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950">
      {/* Fondo de cielo nocturno estelar */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-slate-950 to-purple-950/80" />

      {/* Estrellas titilantes */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 23 + 7) % 60}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5 + (i % 4) * 0.5,
            repeat: Infinity,
            delay: (i * 0.2) % 2,
          }}
        />
      ))}

      {/* OVNI / NAVE EXTRATERRESTRE */}
      <motion.g
        className="absolute z-20 pointer-events-none"
        initial={{ x: '-15%', y: '10%' }}
        animate={{
          x: ['-15%', '115%'],
          y: ['10%', '18%', '8%', '22%', '12%'],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: 'linear' },
          y: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
          {/* Rayo abductor emisor */}
          <motion.polygon
            points="60,35 20,110 100,110"
            fill="url(#ufoBeamGrad)"
            animate={{ opacity: [0.15, 0.65, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <defs>
            <linearGradient id="ufoBeamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Cúpula transparente */}
          <ellipse cx="60" cy="30" rx="16" ry="12" fill="#67e8f9" opacity="0.85" />
          <ellipse cx="56" cy="27" rx="5" ry="3" fill="#ffffff" opacity="0.9" />

          {/* Alien dentro del platillo */}
          <circle cx="60" cy="28" r="4" fill="#22c55e" />
          <circle cx="58" cy="27" r="1" fill="#000" />
          <circle cx="62" cy="27" r="1" fill="#000" />

          {/* Cuerpo metálico del platillo */}
          <ellipse cx="60" cy="34" rx="42" ry="10" fill="#94a3b8" />
          <ellipse cx="60" cy="36" rx="46" ry="6" fill="#475569" />

          {/* Luces giratorias de la nave */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={30 + i * 15}
              cy={36}
              r={2.5}
              fill={(i % 2 === 0) ? '#38bdf8' : '#e879f9'}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </svg>
      </motion.g>

      {/* SVG DE LA CIUDAD EN CONSTRUCCIÓN PROGRESIVA CON LETREROS NEÓN DE RUBROS REALES */}
      <svg
        viewBox="0 0 1200 360"
        className="absolute bottom-0 left-0 w-full h-[90%] md:h-[95%]"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Suelo neón de cimientos */}
        <motion.rect
          x="0" y="356" width="1200" height="4"
          fill="#c084fc"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />

        {buildings.map((b) => {
          const buildingY = 360 - b.height;
          return (
            <g key={b.id}>
              {/* Láser de crecimiento */}
              <motion.line
                x1={b.x + b.width / 2}
                y1="360"
                x2={b.x + b.width / 2}
                y2={buildingY}
                stroke="#22d3ee"
                strokeWidth={2}
                initial={{ opacity: 0, y2: 360 }}
                animate={{ opacity: [0, 1, 0], y2: buildingY }}
                transition={{
                  duration: 0.4,
                  delay: b.delay,
                  ease: 'easeOut'
                }}
              />

              {/* Cuerpo del Edificio */}
              <motion.rect
                x={b.x}
                y={buildingY}
                width={b.width}
                height={b.height}
                fill={b.color}
                rx={2}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 14,
                  delay: b.delay + 0.1,
                }}
                style={{ transformOrigin: `${b.x + b.width / 2}px 360px` }}
              />

              {/* LETREROS NEÓN DE RUBROS / CLIENTES (CONCESIONARIO, E-COMMERCE ROPA, BAR, SALUD, LEGAL) */}
              {b.sign && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: b.delay + 0.7, duration: 0.5, type: 'spring' }}
                >
                  {/* Soporte metálico del letrero */}
                  <line
                    x1={b.x + b.width / 2 - 12}
                    y1={buildingY}
                    x2={b.x + b.width / 2 - 12}
                    y2={buildingY - 24}
                    stroke={b.sign.neonColor}
                    strokeWidth="1.5"
                  />
                  <line
                    x1={b.x + b.width / 2 + 12}
                    y1={buildingY}
                    x2={b.x + b.width / 2 + 12}
                    y2={buildingY - 24}
                    stroke={b.sign.neonColor}
                    strokeWidth="1.5"
                  />

                  {/* Caja/Marco Neón del Letrero */}
                  <motion.rect
                    x={b.x - 22}
                    y={buildingY - 48}
                    width={b.width + 44}
                    height="24"
                    rx="4"
                    fill="#090d16"
                    stroke={b.sign.neonColor}
                    strokeWidth="2"
                    animate={{
                      strokeOpacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Ícono y Texto Principal del Rubro */}
                  <text
                    x={b.x + b.width / 2}
                    y={buildingY - 37}
                    fill={b.sign.textColor}
                    fontSize="9"
                    fontWeight="900"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {b.sign.icon} {b.sign.text}
                  </text>

                  {/* Subtexto del Rubro */}
                  <text
                    x={b.x + b.width / 2}
                    y={buildingY - 28}
                    fill="#94a3b8"
                    fontSize="6"
                    fontWeight="700"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {b.sign.subtext}
                  </text>
                </motion.g>
              )}

              {/* Borde superior neón */}
              <motion.rect
                x={b.x}
                y={buildingY}
                width={b.width}
                height={3}
                fill="#38bdf8"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0.4], scaleX: [0, 1, 1] }}
                transition={{
                  delay: b.delay + 0.5,
                  duration: 0.5
                }}
              />

              {/* Antena en el techo (si no tiene letrero) */}
              {b.hasAntenna && !b.sign && (
                <motion.g
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: b.delay + 0.6, duration: 0.3 }}
                  style={{ transformOrigin: `${b.x + b.width / 2}px ${buildingY}px` }}
                >
                  <line
                    x1={b.x + b.width / 2}
                    y1={buildingY}
                    x2={b.x + b.width / 2}
                    y2={buildingY - 20}
                    stroke="#e879f9"
                    strokeWidth={2}
                  />
                  <motion.circle
                    cx={b.x + b.width / 2}
                    cy={buildingY - 20}
                    r={3}
                    fill="#ef4444"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.g>
              )}

              {/* Ventanas con luces que se prenden y apagan */}
              {b.windows.map((win, wi) => (
                <motion.rect
                  key={wi}
                  x={b.x + win.wx}
                  y={buildingY + win.wy}
                  width={6}
                  height={8}
                  rx={1}
                  fill={(b.id + wi) % 3 === 0 ? '#fde047' : '#c084fc'}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: win.isFlickering
                      ? [0, 1, 0.2, 1, 0.3]
                      : [0, 1, 0.8],
                    scale: 1
                  }}
                  transition={{
                    opacity: {
                      delay: b.delay + 0.5 + (win.wy / b.height) * 0.3,
                      duration: win.isFlickering ? 3 + (wi % 3) : 1.5,
                      repeat: win.isFlickering ? Infinity : 0,
                      ease: 'easeInOut'
                    },
                    scale: {
                      delay: b.delay + 0.5 + (win.wy / b.height) * 0.3,
                      duration: 0.3
                    }
                  }}
                />
              ))}
            </g>
          );
        })}

        {/* Grúa de construcción animada */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <rect x="1080" y="70" width="6" height="290" fill="#c084fc" />
          <rect x="1030" y="70" width="130" height="4" fill="#c084fc" />
          <line x1="1145" y1="74" x2="1145" y2="150" stroke="#f472b6" strokeWidth="1.5" />
          <motion.rect
            x="1139" y="150" width="12" height="16" rx="2"
            fill="#a855f7"
            animate={{ y: [150, 180, 150] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
