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
    <div className="min-h-screen bg-pale-pink/30 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-purple-950">
            {t.skills.title}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        {/* CATEGORÍAS DE SERVICIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.skills.categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-purple-100 space-y-4 hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
                0{idx + 1}
              </div>
              <h3 className="text-2xl font-bold text-purple-950">
                {cat.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MATRIZ DE SKILLS TÉCNICAS */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-purple-950 text-center">
            Matriz de Habilidades Clave
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillList.map((skill, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-white/90 shadow-md border border-purple-100 flex items-center justify-between hover:scale-105 transition-transform"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    {skill.category}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    {skill.title}
                  </h4>
                </div>
                <span className="px-3 py-1 bg-purple-900/10 text-purple-900 text-xs font-bold rounded-full">
                  {skill.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-purple-950/60 font-medium">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
