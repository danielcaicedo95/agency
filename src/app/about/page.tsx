'use client';

import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-pale-pink/30 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* HEADER & BIO */}
        <div className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl border border-purple-100 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-purple-950">
              {t.about.title}
            </h1>
            <p className="text-lg font-semibold text-purple-800">
              Daniel Caicedo — {t.hero.role}
            </p>
          </div>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {t.about.bio}
          </p>

          <div className="pt-4 border-t border-purple-100 flex flex-wrap gap-6 items-center text-sm font-medium text-gray-700">
            <div>
              <span className="font-bold text-purple-950">📍 Ubicación:</span> Colombia (Disponible para trabajo Remoto e Internacional)
            </div>
            <div>
              <span className="font-bold text-purple-950">✉️ Contacto Directo:</span> danielcaicedoco@gmail.com
            </div>
          </div>
        </div>

        {/* EDUCACIÓN & CERTIFICACIONES */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-purple-950">
            🎓 {t.about.educationTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.about.education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-white/90 shadow-md border border-purple-100 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
                  Certificado / Título
                </div>
                <h4 className="font-bold text-purple-950 text-base">
                  {edu.title}
                </h4>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {edu.org}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IDIOMAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Idiomas hablados */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-purple-100 space-y-4">
            <h3 className="text-2xl font-bold text-purple-950 flex items-center gap-2">
              🌐 {t.about.languagesTitle}
            </h3>
            <div className="space-y-3">
              {t.about.spokenLangs.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                  <span className="font-bold text-purple-950">{lang.name}</span>
                  <span className="px-3 py-1 bg-purple-900 text-white text-xs font-bold rounded-full">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Idiomas optimizados en SEO */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-purple-100 space-y-4">
            <h3 className="text-2xl font-bold text-purple-950 flex items-center gap-2">
              🚀 {t.about.seoLangsTitle}
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {t.about.seoLangsList.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-vintage-blue/50 text-purple-950 text-xs font-bold rounded-lg border border-purple-200"
                >
                  ✓ {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* REFERENCIAS PROFESIONALES */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-purple-950">
            🤝 {t.about.referencesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.references.map((ref, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-white/90 shadow-md border border-purple-100 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="font-bold text-purple-950 text-lg">
                  {ref.name}
                </div>
                <div className="text-xs font-semibold text-purple-700">
                  {ref.role}
                </div>
                {ref.contact && (
                  <div className="text-xs text-gray-600 font-medium pt-2">
                    📞 {ref.contact}
                  </div>
                )}
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
