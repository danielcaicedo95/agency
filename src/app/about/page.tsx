'use client';

import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

// ─── Professional SVG Icons ───────────────────────────────────────────────────
const IconGraduation = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const IconGlobe = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconRocket = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconMail = () => (
  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
  </svg>
);

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
            <div className="flex items-center gap-2">
              <IconMapPin />
              <span>
                <span className="font-bold text-white">Ubicación:</span>{' '}
                Colombia (Disponible para trabajo Remoto e Internacional)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconMail />
              <span>
                <span className="font-bold text-white">Email Directo:</span>{' '}
                <a href="mailto:danielcaicedoco@gmail.com" className="text-cyan-300 underline hover:text-cyan-200">
                  danielcaicedoco@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* EDUCACIÓN & CERTIFICACIONES */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <IconGraduation />
            </span>
            {t.about.educationTitle}
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
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Certificado / Título
                </div>
                <h4 className="font-bold text-white text-base">{edu.title}</h4>
                <p className="text-xs text-slate-400 font-medium mt-1">{edu.org}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IDIOMAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Idiomas hablados */}
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-xl bg-slate-950/80 border border-purple-500/30">
                <IconGlobe />
              </span>
              {t.about.languagesTitle}
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
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-xl bg-slate-950/80 border border-purple-500/30">
                <IconRocket />
              </span>
              {t.about.seoLangsTitle}
            </h3>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {t.about.seoLangsList.map((lang, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-950 text-cyan-300 text-xs font-mono font-bold rounded-lg border border-cyan-500/30"
                >
                  <IconCheck />
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* REFERENCIAS PROFESIONALES */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <IconUsers />
            </span>
            {t.about.referencesTitle}
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
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {ref.name.charAt(0)}
                  </div>
                  <div className="font-bold text-white text-base">{ref.name}</div>
                </div>
                <div className="text-xs font-mono font-bold text-cyan-400">{ref.role}</div>
                {ref.contact && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium pt-1">
                    <IconPhone />
                    {ref.contact}
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
