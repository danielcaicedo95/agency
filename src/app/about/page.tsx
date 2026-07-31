'use client';

import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 w-full">
        {/* HEADER & BIO */}
        <div className="bg-slate-900/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-purple-500/20 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-slate-950 px-4 py-1.5 rounded-full border border-cyan-500/30">
              PROFESSIONAL BACKGROUND
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              {t.about.title}
            </h1>
            <p className="text-lg font-semibold text-cyan-300">
              Daniel Caicedo — {t.hero.role}
            </p>
          </div>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.about.bio}
          </p>

          <div className="pt-6 border-t border-purple-900/40 flex flex-wrap gap-6 items-center text-sm font-medium text-slate-300">
            <div>
              <span className="font-bold text-white">📍 Ubicación:</span> Colombia (Disponible para trabajo Remoto e Internacional)
            </div>
            <div>
              <span className="font-bold text-white">✉️ Email Directo:</span> <a href="mailto:danielcaicedoco@gmail.com" className="text-cyan-300 underline hover:text-cyan-200">danielcaicedoco@gmail.com</a>
            </div>
          </div>
        </div>

        {/* EDUCACIÓN & CERTIFICACIONES */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white">
            🎓 {t.about.educationTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.about.education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-purple-500/20 hover:border-cyan-400/50 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Certificado / Título
                </div>
                <h4 className="font-bold text-white text-base">
                  {edu.title}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {edu.org}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IDIOMAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Idiomas hablados */}
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              🌐 {t.about.languagesTitle}
            </h3>
            <div className="space-y-3">
              {t.about.spokenLangs.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-purple-500/20">
                  <span className="font-bold text-white">{lang.name}</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold rounded-full">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Idiomas optimizados en SEO */}
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              🚀 {t.about.seoLangsTitle}
            </h3>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {t.about.seoLangsList.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-slate-950 text-cyan-300 text-xs font-mono font-bold rounded-lg border border-cyan-500/30"
                >
                  ✓ {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* REFERENCIAS PROFESIONALES */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white">
            🤝 {t.about.referencesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.references.map((ref, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-purple-500/20 space-y-2 hover:border-cyan-400/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="font-bold text-white text-lg">
                  {ref.name}
                </div>
                <div className="text-xs font-mono font-bold text-cyan-400">
                  {ref.role}
                </div>
                {ref.contact && (
                  <div className="text-xs text-slate-300 font-medium pt-2">
                    📞 {ref.contact}
                  </div>
                )}
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
