'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CASOS_EXITO } from '@/app/data/casos-exito';

interface CasosExitoGSCProps {
  isCompact?: boolean;
  showTitle?: boolean;
}

export default function CasosExitoGSC({ isCompact = false, showTitle = true }: CasosExitoGSCProps) {
  const [selectedId, setSelectedId] = useState<string>('automoviles');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const activeCaso = CASOS_EXITO.find((c) => c.id === selectedId) || CASOS_EXITO[2];
  const displayList = isCompact ? CASOS_EXITO.slice(0, 3) : CASOS_EXITO;

  return (
    <section className="relative py-6 sm:py-10 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* GLOW DE FONDO */}
      <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-10 px-1 sm:px-0">
        {/* HEADER OPCIONAL */}
        {showTitle && (
          <div className="text-center space-y-2.5 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-slate-900/80 px-3 sm:px-4 py-1.5 rounded-full border border-cyan-500/30 inline-flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              GOOGLE SEARCH CONSOLE — CASOS REALES DE CRECIMIENTO
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              Casos de Éxito SEO por Sector
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto px-2">
              Resultados de Search Performance verificados y métricas reales de crecimiento orgánico.
            </p>
          </div>
        )}

        {/* STATS OVERVIEW BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-purple-500/20 text-center space-y-0.5">
            <div className="text-lg sm:text-2xl font-black text-cyan-400">+1,800%</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider">Promedio Clics</div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-purple-500/20 text-center space-y-0.5">
            <div className="text-lg sm:text-2xl font-black text-purple-400">+5.2M</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider">Impresiones</div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-purple-500/20 text-center space-y-0.5">
            <div className="text-lg sm:text-2xl font-black text-cyan-400">5 Sectores</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider">Documentados</div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-purple-500/20 text-center space-y-0.5">
            <div className="text-lg sm:text-2xl font-black text-purple-400">Top 3</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider">Búsquedas Clave</div>
          </div>
        </div>

        {/* SECTOR TABS SELECTOR (CON DESPLAZAMIENTO FLUIDO EN MÓVIL) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x px-1">
          {CASOS_EXITO.map((c) => {
            const isActive = c.id === selectedId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`snap-center shrink-0 whitespace-nowrap px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/60 text-slate-400 border-purple-500/20 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{c.sector}</span>
              </button>
            );
          })}
        </div>

        {/* FEATURED CASE SHOWCASE */}
        {activeCaso && (
          <motion.div
            key={activeCaso.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-purple-500/30 p-4 sm:p-7 space-y-5 sm:space-y-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
              
              {/* LEFT: GSC CAPTURA */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                  <span className="text-purple-300 uppercase tracking-wider font-semibold">
                    Google Search Console ({activeCaso.period})
                  </span>
                  <span className="hidden sm:inline">🔍 Clic para pantalla completa</span>
                </div>

                <div
                  onClick={() => setModalImage(activeCaso.gscImage)}
                  className="relative group rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 cursor-pointer shadow-xl hover:border-cyan-400 transition-all duration-300"
                >
                  <Image
                    src={activeCaso.gscImage}
                    alt={`Google Search Console ${activeCaso.sector}`}
                    width={900}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-widest backdrop-blur-xs">
                    Ampliar gráfica ↗
                  </div>
                </div>

                {/* METRICS GRID RESPONSIVA (2 COLS EN MOBILE, 4 EN PANTALLAS MAYORES) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-slate-950/70 p-2 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Impresiones</div>
                    <div className="text-xs sm:text-base font-bold text-white">
                      {activeCaso.metrics.impressions.after}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-bold font-mono">{activeCaso.metrics.impressions.growth}</div>
                  </div>
                  <div className="bg-slate-950/70 p-2 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Clics Orgánicos</div>
                    <div className="text-xs sm:text-base font-bold text-cyan-300">
                      {activeCaso.metrics.clicks.after}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-bold font-mono">{activeCaso.metrics.clicks.growth}</div>
                  </div>
                  <div className="bg-slate-950/70 p-2 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">CTR Promedio</div>
                    <div className="text-xs sm:text-base font-bold text-purple-300 font-mono">
                      {activeCaso.metrics.ctr}
                    </div>
                    <div className="text-[9px] text-slate-400">Optimizado</div>
                  </div>
                  <div className="bg-slate-950/70 p-2 sm:p-2.5 rounded-xl border border-purple-500/20 text-center">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Posición Media</div>
                    <div className="text-xs sm:text-base font-bold text-white font-mono">
                      #{activeCaso.metrics.avgPosition}
                    </div>
                    <div className="text-[9px] text-cyan-400">Top 10 Google</div>
                  </div>
                </div>
              </div>

              {/* RIGHT: ESTRATEGIA Y DETALLES CONTEXTUALES CORTOS */}
              <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                    Sector {activeCaso.sector}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                    {activeCaso.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1 sm:mt-1.5">
                    {activeCaso.subtitle}
                  </p>
                </div>

                {/* STRATEGY TAGS */}
                <div>
                  <h4 className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5">
                    Estrategia SEO
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {activeCaso.strategies.map((st, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-purple-950/80 text-cyan-300 border border-purple-500/30 text-[10px] sm:text-[11px] font-mono"
                      >
                        ✓ {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CHALLENGE & IMPACT CONDENSED */}
                <div className="space-y-2 pt-2 border-t border-purple-900/40 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2 bg-slate-950/50 p-2 sm:p-2.5 rounded-xl border border-purple-500/10">
                    <span className="text-purple-400 font-mono font-bold shrink-0 text-[11px]">RETO:</span>
                    <span className="text-slate-300 leading-normal">{activeCaso.challenge}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2 bg-slate-950/50 p-2 sm:p-2.5 rounded-xl border border-purple-500/10">
                    <span className="text-cyan-400 font-mono font-bold shrink-0 text-[11px]">SOLUCIÓN:</span>
                    <span className="text-slate-300 leading-normal">{activeCaso.solution}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2 bg-slate-950/50 p-2 sm:p-2.5 rounded-xl border border-cyan-500/20">
                    <span className="text-white font-mono font-bold shrink-0 text-[11px]">IMPACTO:</span>
                    <span className="text-cyan-300 font-semibold leading-normal">{activeCaso.impact}</span>
                  </div>
                </div>

                {activeCaso.featuredQuote && (
                  <blockquote className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border-l-2 border-cyan-400 italic text-[10px] sm:text-[11px] text-slate-300">
                    &quot;{activeCaso.featuredQuote}&quot;
                  </blockquote>
                )}
              </div>

            </div>
          </motion.div>
        )}

        {/* GRID DE OTROS CASOS (1 COL EN MOBILE, 2 EN TABLET, 3 EN DESKTOP) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {displayList.map((caso) => (
            <div
              key={caso.id}
              onClick={() => setSelectedId(caso.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                caso.id === selectedId
                  ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                    {caso.categoryBadge}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {caso.metrics.clicks.growth} Clics
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {caso.sector}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-2">
                  {caso.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>Ver Caso GSC</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL RESOLUTION IMAGE MODAL */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-3 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-purple-500/40 bg-slate-900 p-2">
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-colors text-sm sm:text-base"
              >
                ✕
              </button>
              <Image
                src={modalImage}
                alt="Google Search Console Grafico Full"
                width={1400}
                height={800}
                className="w-full h-auto object-contain max-h-[82vh] rounded-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


