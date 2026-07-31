'use client';

import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const { t } = useLanguage();

  const skillList = [
    { title: t.skills.technical, level: 'Experto', category: 'SEO' },
    { title: t.skills.sem, level: 'Avanzado', category: 'Ads' },
    { title: t.skills.ai, level: 'Avanzado', category: 'IA' },
    { title: t.skills.analytics, level: 'Experto', category: 'Data' },
    { title: t.skills.cms, level: 'Experto', category: 'Web' },
    { title: t.skills.content, level: 'Experto', category: 'SEO' },
    { title: t.skills.linkbuilding, level: 'Avanzado', category: 'SEO' },
    { title: t.skills.local, level: 'Avanzado', category: 'SEO' },
    { title: t.skills.code, level: 'Avanzado', category: 'Code' },
    { title: t.skills.reporting, level: 'Experto', category: 'Data' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16 w-full">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/30">
            TECHNICAL & STRATEGIC CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            {t.skills.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        {/* CATEGORÍAS DE SERVICIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.skills.categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20 hover:border-cyan-400/50 space-y-4 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-bold text-cyan-300 text-lg">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MATRIZ DE SKILLS TÉCNICAS */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white text-center">
            Matriz de Habilidades Clave
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillList.map((skill, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-purple-500/20 flex items-center justify-between hover:border-cyan-400/60 hover:scale-105 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    {skill.category}
                  </span>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {skill.title}
                  </h4>
                </div>
                <span className="px-3 py-1 bg-purple-950 text-cyan-300 text-xs font-mono font-bold rounded-full border border-purple-500/30">
                  {skill.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
