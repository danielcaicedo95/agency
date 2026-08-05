'use client';

import Navbar from '@/app/components/Navbar';
import CasosExitoGSC from '@/app/components/work/CasosExitoGSC';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function WorkPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 w-full">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/30">
            PROVEN IMPACT & CASE STUDIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            {t.work.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            {t.work.subtitle}
          </p>
        </div>

        {/* TIMELINE DE EXPERIENCIA LABORAL */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {t.work.positions.map((pos, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              {/* PUNTO DE LA TIMELINE */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-purple-500/20 group-hover:border-cyan-400/50 space-y-4 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {pos.role}
                    </h3>
                    <span className="text-base font-semibold text-cyan-300">
                      {pos.company}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-purple-950 text-purple-300 text-xs font-mono font-bold rounded-full border border-purple-500/30">
                    {pos.period}
                  </span>
                </div>

                {/* LOGROS Y PUNTOS CLAVE */}
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-300">
                  {pos.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* TECH STACK BADGES */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {pos.tech.map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 bg-slate-950 text-cyan-300 text-xs font-mono rounded-lg border border-purple-500/30"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESTACADO CASOS DE ÉXITO GSC */}
        <CasosExitoGSC isCompact={false} />
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}