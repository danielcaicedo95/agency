'use client';

import Navbar from '@/app/components/Navbar';
import VideoSection from '@/app/components/videosection/VideoSection';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function WorkPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-pale-pink/30 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-purple-950">
            {t.work.title}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t.work.subtitle}
          </p>
        </div>

        {/* TIMELINE DE EXPERIENCIA LABORAL */}
        <div className="relative border-l-4 border-purple-900/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {t.work.positions.map((pos, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* PUNTO DE LA TIMELINE */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-purple-900 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

              <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-100 space-y-4 hover:shadow-2xl transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-950">
                      {pos.role}
                    </h3>
                    <span className="text-base font-semibold text-purple-700">
                      {pos.company}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-900 text-xs font-bold rounded-full">
                    {pos.period}
                  </span>
                </div>

                {/* LOGROS Y PUNTOS CLAVE */}
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  {pos.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-purple-600 font-bold text-lg leading-none mt-1">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* TECH STACK BADGES */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {pos.tech.map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md border border-slate-200"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESTACADO MULTIMEDIA / SHOWCASE */}
        <div className="pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-950 text-center mb-6">
            Caso de Éxito & Video Demo
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <VideoSection
              videoSrc="/comercial1.mp4"
              title="AionIGC — Lead Generation & Strategy"
              description="Estrategia integral SEO/SEM para seguros de salud en EE. UU., logrando captar +3,000 leads cualificados."
            />
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-purple-950/60 font-medium">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}