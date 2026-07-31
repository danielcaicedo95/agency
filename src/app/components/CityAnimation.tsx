'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export interface Establishment {
  type: 'dealership' | 'fashion' | 'bar' | 'health' | 'legal';
  name: string;
  subname: string;
  neonColor: string;
  accentColor: string;
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
  establishment?: Establishment;
}

export default function CityAnimation() {
  const buildings = useMemo<Building[]>(() => {
    const colors = [
      '#1e1b4b', '#312e81', '#3b0764', '#4c1d95',
      '#581c87', '#1e293b', '#0f172a', '#4338ca',
      '#2e1065', '#3730a3', '#1e1b4b', '#581c87',
    ];

    const establishmentMap: { [key: number]: Establishment } = {
      1: {
        type: 'dealership',
        name: 'APEX CYBERMOTORS',
        subname: 'LUXURY SHOWROOM',
        neonColor: '#22d3ee',
        accentColor: '#38bdf8',
        textColor: '#e0f2fe',
      },
      3: {
        type: 'fashion',
        name: 'NEON BOUTIQUE',
        subname: 'E-COMMERCE FASHION',
        neonColor: '#e879f9',
        accentColor: '#f472b6',
        textColor: '#fce7f3',
      },
      6: {
        type: 'bar',
        name: 'GOTHAM BAR & LOUNGE',
        subname: 'GASTROBAR & DRINKS',
        neonColor: '#c084fc',
        accentColor: '#a855f7',
        textColor: '#f3e8ff',
      },
      8: {
        type: 'health',
        name: 'AION HEALTH',
        subname: 'INSURANCE PROTOCOL',
        neonColor: '#4ade80',
        accentColor: '#22c55e',
        textColor: '#dcfce7',
      },
      11: {
        type: 'legal',
        name: 'LEGAL TECH LABS',
        subname: 'DIGITAL LAW FIRM',
        neonColor: '#fde047',
        accentColor: '#eab308',
        textColor: '#fef9c3',
      },
    };

    const bldgs: Building[] = [];
    let xPos = 10;
    let id = 0;

    while (xPos < 1400) {
      const estab = establishmentMap[id];
      const w = estab
        ? (estab.type === 'dealership' ? 140 : 105)
        : 38 + Math.floor((id * 37 + 13) % 48);

      const h = 130 + Math.floor((id * 73 + 29) % 210);
      const gap = 6 + Math.floor((id * 11) % 4);
      const color = colors[id % colors.length];
      const hasAntenna = id % 3 === 0;

      const windows: { wx: number; wy: number; isFlickering: boolean; blinkDelay: number }[] = [];
      const cols = Math.floor((w - 12) / 13);
      const rows = Math.floor((h - 50) / 18);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if ((id + r + c) % 3 !== 0) {
            windows.push({
              wx: 6 + c * 13,
              wy: 12 + r * 18,
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
        delay: 0.12 * id,
        hasAntenna,
        establishment: estab,
      });

      xPos += w + gap;
      id++;
    }

    return bldgs;
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950">
      {/* Cielo nocturno con gradiente de neón */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-slate-950 to-slate-950" />

      {/* Estrellas titilantes en el firmamento */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 23 + 7) % 55}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5 + (i % 4) * 0.5,
            repeat: Infinity,
            delay: (i * 0.2) % 2,
          }}
        />
      ))}

      {/* OVNI / NAVE EXTRATERRESTRE CON LETRERO PUBLICITARIO NEÓN 'ADS' */}
      <motion.g
        className="absolute z-20 pointer-events-none"
        initial={{ x: '-25%', y: '5%' }}
        animate={{
          x: ['-25%', '125%'],
          y: ['5%', '22%', '8%', '28%', '10%', '18%'],
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: 'linear' },
          y: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="180" height="140" viewBox="0 0 180 140" className="overflow-visible">
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

          {/* Platillo metálico */}
          <ellipse cx="60" cy="34" rx="42" ry="10" fill="#94a3b8" />
          <ellipse cx="60" cy="36" rx="46" ry="6" fill="#475569" />

          {/* Luces giratorias neón */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={30 + i * 15}
              cy={36}
              r={2.5}
              fill={i % 2 === 0 ? '#38bdf8' : '#e879f9'}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}

          {/* BANNER / LETRERO PUBLICITARIO HOLOGRÁFICO 'GOOGLE ADS' REMOLCADO POR LA NAVE */}
          <g transform="translate(105, 18)">
            {/* Cable de acople flotante */}
            <line x1="-5" y1="16" x2="0" y2="16" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
            
            {/* Marco de letrero publicitario Neón ADS */}
            <rect x="0" y="4" width="70" height="24" rx="4" fill="#090d16" stroke="#f472b6" strokeWidth="1.5" />
            
            {/* Texto neón parpadeante GOOGLE ADS */}
            <text x="35" y="15" fill="#38bdf8" fontSize="8" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
              ⚡ GOOGLE ADS
            </text>
            <text x="35" y="23" fill="#fde047" fontSize="6" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
              CAMPAIGNS 🚀
            </text>
          </g>
        </svg>
      </motion.g>

      {/* SVG PRINCIPAL DE LA CIUDAD, CALLE Y LÁMPARAS DE ALUMBRADO */}
      <svg
        viewBox="0 0 1200 360"
        className="absolute bottom-0 left-0 w-full h-[90%] md:h-[95%]"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* ========================================================= */}
        {/* CALLE REALISTA DE ASFALTO Y PINTURA NEÓN */}
        {/* ========================================================= */}
        {/* Asfalto */}
        <rect x="0" y="340" width="1200" height="20" fill="#090d16" />
        <rect x="0" y="340" width="1200" height="2" fill="#1e293b" />
        
        {/* Línea divisoria de carril amarilla discontinua */}
        <line
          x1="0" y1="350" x2="1200" y2="350"
          stroke="#fde047" strokeWidth="1.5"
          strokeDasharray="16 12" strokeOpacity="0.8"
        />

        {/* Pasos de peatones (Zebra crosswalk) */}
        {[80, 520, 960].map((cx, i) => (
          <g key={`cross-${i}`}>
            {[...Array(6)].map((_, zi) => (
              <rect
                key={zi}
                x={cx + zi * 8}
                y="342"
                width="4"
                height="16"
                fill="#f8fafc"
                opacity="0.7"
              />
            ))}
          </g>
        ))}

        {/* Línea neón de bordillo de acera */}
        <line x1="0" y1="338" x2="1200" y2="338" stroke="#38bdf8" strokeWidth="1.5" />

        {/* ========================================================= */}
        {/* LÁMPARAS DE ALUMBRADO PÚBLICO (CON 1 LÁMPARA DAÑADA TITILANDO) */}
        {/* ========================================================= */}
        {[100, 320, 580, 820, 1040].map((lx, idx) => {
          const isDamaged = idx === 2; // La lámpara en x=580 está dañada y titila
          return (
            <g key={`lamp-${idx}`}>
              {/* Poste metálico futurista */}
              <line x1={lx} y1="338" x2={lx} y2="295" stroke="#475569" strokeWidth="2.5" />
              {/* Brazo curvo */}
              <path d={`M ${lx},295 Q ${lx + 8},288 ${lx + 14},290`} fill="none" stroke="#64748b" strokeWidth="2" />
              
              {/* Cabeza de la luminaria LED */}
              <ellipse cx={lx + 14} cy={290} rx="4" ry="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />

              {/* CONO DE LUZ DE LA LÁMPARA */}
              {isDamaged ? (
                // LÁMPARA DAÑADA / PARPADEO IRREGULAR
                <g>
                  <motion.polygon
                    points={`${lx + 14},291 ${lx - 12},340 ${lx + 40},340`}
                    fill="url(#lampLightGrad)"
                    animate={{
                      opacity: [0.05, 0.9, 0.1, 0.8, 0.0, 1, 0.15, 0.95, 0.05],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.circle
                    cx={lx + 14} cy={291} r="2.5" fill="#fde047"
                    animate={{ opacity: [0.1, 1, 0.2, 0.9, 0.05, 1, 0.2] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  />
                </g>
              ) : (
                // LÁMPARA NORMAL FUNCIONAL
                <g>
                  <polygon
                    points={`${lx + 14},291 ${lx - 12},340 ${lx + 40},340`}
                    fill="url(#lampLightGrad)"
                    opacity="0.3"
                  />
                  <circle cx={lx + 14} cy={291} r="2.5" fill="#67e8f9" />
                </g>
              )}
            </g>
          );
        })}

        <defs>
          <linearGradient id="lampLightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* BUILDINGS RENDER */}
        {buildings.map((b) => {
          const buildingY = 338 - b.height;
          const groundY = 338;
          const facadeH = 40;
          const facadeY = groundY - facadeH;

          return (
            <g key={b.id}>
              {/* Láser de construcción que se eleva */}
              <motion.line
                x1={b.x + b.width / 2}
                y1="338"
                x2={b.x + b.width / 2}
                y2={buildingY}
                stroke="#22d3ee"
                strokeWidth={2}
                initial={{ opacity: 0, y2: 338 }}
                animate={{ opacity: [0, 1, 0], y2: buildingY }}
                transition={{ duration: 0.4, delay: b.delay, ease: 'easeOut' }}
              />

              {/* Cuerpo Estructural del Edificio */}
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
                style={{ transformOrigin: `${b.x + b.width / 2}px 338px` }}
              />

              {/* Borde Neón Superior */}
              <motion.rect
                x={b.x}
                y={buildingY}
                width={b.width}
                height={3}
                fill="#38bdf8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: b.delay + 0.4 }}
              />

              {/* Antena en el Techo */}
              {b.hasAntenna && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: b.delay + 0.5 }}
                >
                  <line
                    x1={b.x + b.width / 2} y1={buildingY}
                    x2={b.x + b.width / 2} y2={buildingY - 18}
                    stroke="#a855f7" strokeWidth="2"
                  />
                  <motion.circle
                    cx={b.x + b.width / 2} cy={buildingY - 18} r="3"
                    fill="#ef4444"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.g>
              )}

              {/* Ventanas Iluminadas */}
              {b.windows.map((win, wi) => (
                <motion.rect
                  key={wi}
                  x={b.x + win.wx}
                  y={buildingY + win.wy}
                  width={6}
                  height={8}
                  rx={1}
                  fill={(b.id + wi) % 3 === 0 ? '#fde047' : '#c084fc'}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: win.isFlickering ? [0, 1, 0.2, 1, 0.3] : [0, 1, 0.8],
                  }}
                  transition={{
                    delay: b.delay + 0.4 + (win.wy / b.height) * 0.3,
                    duration: win.isFlickering ? 3 + (wi % 3) : 1.5,
                    repeat: win.isFlickering ? Infinity : 0,
                  }}
                />
              ))}

              {/* ========================================================= */}
              {/* PUERTAS Y FACHADAS ULTRA MODERNAS CON SENSORES Y NEÓN */}
              {/* ========================================================= */}

              {/* PUERTA MODERNA FUTURISTA DE CRISTAL PARA EDIFICIOS REGULARES */}
              {!b.establishment && b.width >= 35 && (
                <g>
                  {/* Marco exterior de portal neón cian */}
                  <rect
                    x={b.x + b.width / 2 - 9}
                    y={groundY - 25}
                    width={18}
                    height={25}
                    fill="#030712"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    rx="2"
                  />
                  {/* Paneles de vidrio deslizable con resplandor */}
                  <rect
                    x={b.x + b.width / 2 - 7}
                    y={groundY - 23}
                    width={6}
                    height={23}
                    fill="#38bdf8"
                    fillOpacity="0.4"
                    stroke="#67e8f9"
                    strokeWidth="0.5"
                  />
                  <rect
                    x={b.x + b.width / 2 + 1}
                    y={groundY - 23}
                    width={6}
                    height={23}
                    fill="#38bdf8"
                    fillOpacity="0.4"
                    stroke="#67e8f9"
                    strokeWidth="0.5"
                  />
                  {/* Barra LED sensórica de acceso arriba de la puerta */}
                  <line
                    x1={b.x + b.width / 2 - 7} y1={groundY - 24}
                    x2={b.x + b.width / 2 + 7} y2={groundY - 24}
                    stroke="#fde047" strokeWidth="1.5"
                  />
                </g>
              )}

              {/* 1. CONCESIONARIO DE CARROS (APEX CYBERMOTORS) */}
              {b.establishment?.type === 'dealership' && (
                <g>
                  <rect
                    x={b.x + 4} y={facadeY}
                    width={b.width - 8} height={facadeH}
                    fill="#030712" stroke="#22d3ee" strokeWidth="2" rx="4"
                  />
                  <rect
                    x={b.x + 6} y={facadeY + 2}
                    width={b.width - 12} height={facadeH - 4}
                    fill="url(#showroomGlow)" fillOpacity="0.4"
                  />

                  {/* Puertas de Cristal Deslizante Modernas */}
                  <rect
                    x={b.x + b.width / 2 - 12} y={groundY - 28}
                    width={24} height={28}
                    fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5"
                  />
                  <line x1={b.x + b.width / 2} y1={groundY - 28} x2={b.x + b.width / 2} y2={groundY} stroke="#38bdf8" strokeWidth="1" />

                  {/* AUTO DEPORTIVO CIBERNÉTICO #1 */}
                  <g transform={`translate(${b.x + 12}, ${groundY - 14})`}>
                    <path d="M 0,10 L 6,4 L 18,2 L 28,5 L 36,10 Z" fill="#ef4444" />
                    <path d="M 8,4 L 16,3 L 22,5 L 18,7 Z" fill="#67e8f9" opacity="0.9" />
                    <circle cx="8" cy="11" r="3.5" fill="#090d16" stroke="#22d3ee" strokeWidth="1.5" />
                    <circle cx="28" cy="11" r="3.5" fill="#090d16" stroke="#22d3ee" strokeWidth="1.5" />
                    <circle cx="34" cy="9" r="1.5" fill="#fde047" />
                  </g>

                  {/* AUTO DEPORTIVO CIBERNÉTICO #2 */}
                  <g transform={`translate(${b.x + 82}, ${groundY - 14})`}>
                    <path d="M 0,10 L 6,4 L 18,2 L 28,5 L 36,10 Z" fill="#38bdf8" />
                    <path d="M 8,4 L 16,3 L 22,5 L 18,7 Z" fill="#f472b6" opacity="0.9" />
                    <circle cx="8" cy="11" r="3.5" fill="#090d16" stroke="#e879f9" strokeWidth="1.5" />
                    <circle cx="28" cy="11" r="3.5" fill="#090d16" stroke="#e879f9" strokeWidth="1.5" />
                    <circle cx="34" cy="9" r="1.5" fill="#22d3ee" />
                  </g>

                  {/* LETRERO NEÓN ENCIMA DE LA PUERTA */}
                  <g>
                    <rect
                      x={b.x + 8} y={facadeY - 18}
                      width={b.width - 16} height="16"
                      rx="3" fill="#090d16" stroke="#22d3ee" strokeWidth="2"
                    />
                    <text
                      x={b.x + b.width / 2} y={facadeY - 8}
                      fill="#e0f2fe" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle"
                    >
                      ⚡ APEX CYBERMOTORS ⚡
                    </text>
                  </g>
                </g>
              )}

              {/* 2. BOUTIQUE E-COMMERCE DE ROPA */}
              {b.establishment?.type === 'fashion' && (
                <g>
                  <rect
                    x={b.x + 4} y={facadeY}
                    width={b.width - 8} height={facadeH}
                    fill="#090d16" stroke="#e879f9" strokeWidth="1.5" rx="3"
                  />
                  <rect
                    x={b.x + b.width / 2 - 10} y={groundY - 26}
                    width={20} height={26}
                    fill="#1e1b4b" stroke="#f472b6" strokeWidth="1"
                  />
                  <g transform={`translate(${b.x + 12}, ${groundY - 22})`}>
                    <line x1="6" y1="0" x2="6" y2="20" stroke="#f472b6" strokeWidth="1" />
                    <path d="M 2,4 L 10,4 L 8,12 L 4,12 Z" fill="#e879f9" />
                  </g>
                  <g transform={`translate(${b.x + b.width - 24}, ${groundY - 22})`}>
                    <line x1="6" y1="0" x2="6" y2="20" stroke="#38bdf8" strokeWidth="1" />
                    <path d="M 2,4 L 10,4 L 8,14 L 4,14 Z" fill="#38bdf8" />
                  </g>
                  <polygon
                    points={`${b.x + 2},${facadeY} ${b.x + b.width - 2},${facadeY} ${b.x + b.width - 6},${facadeY + 8} ${b.x + 6},${facadeY + 8}`}
                    fill="#e879f9"
                  />
                  <g>
                    <rect
                      x={b.x + 6} y={facadeY - 16}
                      width={b.width - 12} height="14"
                      rx="3" fill="#090d16" stroke="#e879f9" strokeWidth="1.5"
                    />
                    <text
                      x={b.x + b.width / 2} y={facadeY - 8}
                      fill="#fce7f3" fontSize="8" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle"
                    >
                      🛍️ NEON BOUTIQUE
                    </text>
                  </g>
                </g>
              )}

              {/* 3. BAR & GASTROBAR */}
              {b.establishment?.type === 'bar' && (
                <g>
                  <rect
                    x={b.x + 4} y={facadeY}
                    width={b.width - 8} height={facadeH}
                    fill="#1e1035" stroke="#c084fc" strokeWidth="1.5" rx="3"
                  />
                  <path
                    d={`M ${b.x + b.width / 2 - 12},${groundY} L ${b.x + b.width / 2 - 12},${groundY - 18} A 12,12 0 0,1 ${b.x + b.width / 2 + 12},${groundY - 18} L ${b.x + b.width / 2 + 12},${groundY} Z`}
                    fill="#3b0764" stroke="#a855f7" strokeWidth="1.5"
                  />
                  <circle cx={b.x + 12} cy={groundY - 18} r="3" fill="#fde047" />
                  <circle cx={b.x + b.width - 12} cy={groundY - 18} r="3" fill="#fde047" />
                  <polygon
                    points={`${b.x + b.width / 2 - 5},${facadeY + 4} ${b.x + b.width / 2 + 5},${facadeY + 4} ${b.x + b.width / 2},${facadeY + 12}`}
                    fill="none" stroke="#22d3ee" strokeWidth="1.5"
                  />
                  <g>
                    <rect
                      x={b.x + 4} y={facadeY - 16}
                      width={b.width - 8} height="14"
                      rx="3" fill="#090d16" stroke="#c084fc" strokeWidth="1.5"
                    />
                    <text
                      x={b.x + b.width / 2} y={facadeY - 8}
                      fill="#f3e8ff" fontSize="8" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle"
                    >
                      🍸 GOTHAM BAR & LOUNGE
                    </text>
                  </g>
                </g>
              )}

              {/* 4. SALUD & SEGUROS */}
              {b.establishment?.type === 'health' && (
                <g>
                  <rect
                    x={b.x + 4} y={facadeY}
                    width={b.width - 8} height={facadeH}
                    fill="#022c22" stroke="#4ade80" strokeWidth="1.5" rx="3"
                  />
                  <rect
                    x={b.x + b.width / 2 - 10} y={groundY - 26}
                    width={20} height={26}
                    fill="#064e3b" stroke="#22c55e" strokeWidth="1"
                  />
                  <path
                    d={`M ${b.x + b.width / 2 - 2},${groundY - 18} h 4 v -4 h 4 v 4 h 4 v 4 h -4 v 4 h -4 v -4 h -4 Z`}
                    fill="#4ade80"
                  />
                  <g>
                    <rect
                      x={b.x + 6} y={facadeY - 16}
                      width={b.width - 12} height="14"
                      rx="3" fill="#090d16" stroke="#4ade80" strokeWidth="1.5"
                    />
                    <text
                      x={b.x + b.width / 2} y={facadeY - 8}
                      fill="#dcfce7" fontSize="8" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle"
                    >
                      🏥 AION HEALTHCARE
                    </text>
                  </g>
                </g>
              )}

              {/* 5. LEGAL TECH */}
              {b.establishment?.type === 'legal' && (
                <g>
                  <rect
                    x={b.x + 4} y={facadeY}
                    width={b.width - 8} height={facadeH}
                    fill="#17120a" stroke="#fde047" strokeWidth="1.5" rx="3"
                  />
                  <rect x={b.x + 10} y={facadeY + 6} width="4" height={facadeH - 6} fill="#eab308" />
                  <rect x={b.x + b.width - 14} y={facadeY + 6} width="4" height={facadeH - 6} fill="#eab308" />
                  <rect
                    x={b.x + b.width / 2 - 8} y={groundY - 24}
                    width={16} height={24}
                    fill="#422006" stroke="#fde047" strokeWidth="1"
                  />
                  <g>
                    <rect
                      x={b.x + 4} y={facadeY - 16}
                      width={b.width - 8} height="14"
                      rx="3" fill="#090d16" stroke="#fde047" strokeWidth="1.5"
                    />
                    <text
                      x={b.x + b.width / 2} y={facadeY - 8}
                      fill="#fef9c3" fontSize="8" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle"
                    >
                      ⚖️ LEGAL TECH LABS
                    </text>
                  </g>
                </g>
              )}
            </g>
          );
        })}

        {/* Grúa de construcción animada en el extremo derecho */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <rect x="1110" y="70" width="6" height="270" fill="#c084fc" />
          <rect x="1060" y="70" width="120" height="4" fill="#c084fc" />
          <line x1="1170" y1="74" x2="1170" y2="150" stroke="#f472b6" strokeWidth="1.5" />
          <motion.rect
            x="1164" y="150" width="12" height="16" rx="2"
            fill="#a855f7"
            animate={{ y: [150, 180, 150] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
