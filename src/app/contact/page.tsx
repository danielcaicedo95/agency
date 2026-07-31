'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 w-full">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/30">
            DIRECT COMMUNICATION PROTOCOL
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TARJETAS DE CONTACTO DIRECTO */}
          <div className="space-y-4">
            <a
              href="mailto:danielcaicedoco@gmail.com"
              className="block p-6 bg-slate-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 hover:border-cyan-400/60 hover:scale-105 transition-all group"
            >
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                {t.contact.email}
              </div>
              <div className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300">
                danielcaicedoco@gmail.com
              </div>
            </a>

            <a
              href="https://wa.me/573008061344"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-slate-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 hover:border-cyan-400/60 hover:scale-105 transition-all group"
            >
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                {t.contact.phone}
              </div>
              <div className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300">
                +57 300 806 1344
              </div>
            </a>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-2xl font-bold text-center text-sm shadow-xl hover:scale-105 transition-transform"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-900 text-cyan-300 border border-cyan-500/30 rounded-2xl font-bold text-center text-sm shadow-xl hover:bg-slate-800 transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO TIPO TERMINAL */}
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              {t.contact.formTitle}
            </h3>

            {submitted ? (
              <motion.div
                className="p-6 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-2xl text-center space-y-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-3xl">🎉</div>
                <p className="font-bold">{t.contact.successMsg}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Daniel Caicedo"
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 focus:border-cyan-400 focus:outline-none bg-slate-950 text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tuemail@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 focus:border-cyan-400 focus:outline-none bg-slate-950 text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hola Daniel, nos gustaría consultar contigo sobre..."
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 focus:border-cyan-400 focus:outline-none bg-slate-950 text-white placeholder-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all text-xs font-mono uppercase tracking-wider"
                >
                  {t.contact.sendBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
