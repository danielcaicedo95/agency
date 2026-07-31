'use client';

import { motion } from 'framer-motion';

interface UndergroundGridProps {
  children?: React.ReactNode;
}

export default function UndergroundGrid({ children }: UndergroundGridProps) {
  return (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden pt-12 pb-20">
      {/* SECCIÓN DE TRANSICIÓN SUPERIOR: MANHOLE / CONDUIT DE ENTRADA SUBTERRÁNEA */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-950 via-slate-950/80 to-slate-950 pointer-events-none z-10" />

      {/* LÍNEAS DE FIBRA ÓPTICA Y TUBERÍAS DE DATOS SUBTERRÁNEAS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Rejilla cibernética subterránea */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Tuberías/Cables de datos de neón que fluyen */}
        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Cable Cian */}
          <motion.path
            d="M 100,0 L 100,200 Q 100,300 250,300 L 900,300 Q 1050,300 1050,500 L 1050,900"
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, -64] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Cable Magenta */}
          <motion.path
            d="M 1100,0 L 1100,150 Q 1100,250 950,250 L 300,250 Q 150,250 150,450 L 150,900"
            stroke="#e879f9"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, 80] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Tubería de datos Púrpura central */}
          <motion.path
            d="M 600,0 L 600,900"
            stroke="#a855f7"
            strokeWidth="3"
            fill="none"
            strokeDasharray="12 12"
            animate={{ strokeDashoffset: [0, -96] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      {/* REJILLA / TAPA DE ACCESO TECH SUBTERRÁNEO */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-lg shadow-cyan-950/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            SUBTERRANEAN DATA GRID • BEHIND THE SCENES
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-fuchsia-400 tracking-tight">
            Bajo la Superficie del SEO Técnico
          </h2>

          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Detrás de cada sitio web en primer lugar existe una arquitectura subterránea de tuberías de datos (GA4, GTM), automatización con IA y rastreo optimizado.
          </p>
        </div>

        {/* CONTENIDO INTERNO O TARJETAS */}
        {children}
      </div>
    </div>
  );
}
