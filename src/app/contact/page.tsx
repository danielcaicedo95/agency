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
    <div className="min-h-screen bg-pale-pink/30 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-purple-950">
            {t.contact.title}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TARJETAS DE CONTACTO DIRECTO */}
          <div className="space-y-4">
            <a
              href="mailto:danielcaicedoco@gmail.com"
              className="block p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all group"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                {t.contact.email}
              </div>
              <div className="text-lg font-bold text-purple-950 mt-1 group-hover:text-purple-800">
                danielcaicedoco@gmail.com
              </div>
            </a>

            <a
              href="https://wa.me/573008061344"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all group"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                {t.contact.phone}
              </div>
              <div className="text-lg font-bold text-purple-950 mt-1 group-hover:text-purple-800">
                +57 300 806 1344
              </div>
            </a>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-purple-900 text-white rounded-xl font-bold text-center text-sm shadow-md hover:bg-purple-950 transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-900 text-white rounded-xl font-bold text-center text-sm shadow-md hover:bg-slate-950 transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-purple-100">
            <h3 className="text-2xl font-bold text-purple-950 mb-6">
              {t.contact.formTitle}
            </h3>

            {submitted ? (
              <motion.div
                className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-3xl">🎉</div>
                <p className="font-bold">{t.contact.successMsg}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-purple-950 mb-1">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Daniel Caicedo"
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-purple-950 mb-1">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tuemail@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-purple-950 mb-1">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hola Daniel, nos gustaría consultar contigo sobre..."
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-purple-900 text-white font-bold rounded-xl shadow-lg hover:bg-purple-950 transition-all text-sm uppercase tracking-wider"
                >
                  {t.contact.sendBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-purple-950/60 font-medium">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
