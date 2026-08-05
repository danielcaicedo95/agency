'use client';

import { motion } from 'framer-motion';

interface UndergroundGridProps {
  children?: React.ReactNode;
}

export default function UndergroundGrid({ children }: UndergroundGridProps) {
  return (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden pt-12 pb-20 border-t border-purple-900/30">
      {/* SECCIÓN DE TRANSICIÓN SUPERIOR: GRADIENTE Y EMPALME DE TUBERÍAS */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-purple-950/40 to-transparent pointer-events-none z-10" />

      {/* LÍNEAS DE FIBRA ÓPTICA Y TUBERÍAS DE DATOS SUBTERRÁNEAS CONTINUAS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Rejilla cibernética subterránea */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

        {/* Tuberías/Cables de datos de neón que fluyen conectadas con la sección superior (viewBox="0 0 1200 600") */}
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          {/* Cable Cian (Conectado a X=150 desde la sección Casos de Éxito) */}
          <motion.path
            d="M 150,0 L 150,160 Q 150,260 300,260 L 850,260 Q 1000,260 1000,400 L 1000,600"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeOpacity="0.5"
            fill="none"
            strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, -64] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Cable Magenta (Conectado a X=1050 desde la sección Casos de Éxito) */}
          <motion.path
            d="M 1050,0 L 1050,140 Q 1050,230 900,230 L 350,230 Q 200,230 200,380 L 200,600"
            stroke="#e879f9"
            strokeWidth="2.5"
            strokeOpacity="0.5"
            fill="none"
            strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, 80] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Tubería de datos Púrpura central (Conectada a X=600 desde el eje central) */}
          <motion.path
            d="M 600,0 L 600,600"
            stroke="#a855f7"
            strokeWidth="3"
            strokeOpacity="0.4"
            fill="none"
            strokeDasharray="12 12"
            animate={{ strokeDashoffset: [0, -96] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Nodos de empalme tech en el límite de la sección (Y=0) */}
          <circle cx="150" cy="0" r="4" fill="#22d3ee" />
          <circle cx="1050" cy="0" r="4" fill="#e879f9" />
          <circle cx="600" cy="0" r="5" fill="#a855f7" />
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
