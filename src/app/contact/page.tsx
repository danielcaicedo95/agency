'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  'SEO Técnico',
  'Google Ads / SEM',
  'Automatización IA',
  'Analítica Web (GA4 / GTM)',
  'SEO para E-commerce',
  'Auditoría SEO',
  'Consultoría General',
];

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al enviar el mensaje. Inténtalo de nuevo.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Error de conexión. Revisa tu internet e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-purple-500/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/10 bg-slate-950 text-white placeholder-slate-500 text-sm transition-all';
  const labelClass = 'block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5';

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

            {/* Tiempo de respuesta */}
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <p className="text-sm text-emerald-300 font-medium">
                {language === 'es'
                  ? 'Respuesta típica en menos de 24 horas hábiles'
                  : 'Typical response in less than 24 business hours'}
              </p>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO */}
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              {t.contact.formTitle}
            </h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="p-6 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-2xl text-center space-y-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-5xl">🎉</div>
                  <p className="font-black text-lg">{t.contact.successMsg}</p>
                  <p className="text-sm text-emerald-400/80">
                    {language === 'es'
                      ? 'He recibido tu mensaje y te responderé en breve.'
                      : "I've received your message and will reply shortly."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
                    }}
                    className="mt-2 text-xs underline text-emerald-500 hover:text-emerald-300"
                  >
                    {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Nombre + Empresa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{t.contact.nameLabel} *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        {language === 'es' ? 'Empresa' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Tu empresa"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email + Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{t.contact.emailLabel} *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        {language === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+57 300 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Servicio */}
                  <div>
                    <label className={labelClass}>
                      {language === 'es' ? 'Servicio de Interés' : 'Service of Interest'}
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">
                        {language === 'es' ? 'Selecciona un servicio...' : 'Select a service...'}
                      </option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className={labelClass}>{t.contact.messageLabel} *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={
                        language === 'es'
                          ? 'Cuéntame sobre tu proyecto, objetivos y en qué puedo ayudarte...'
                          : 'Tell me about your project, goals and how I can help...'
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-500/30 rounded-xl text-red-300 text-sm"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        ⚠️ {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs font-mono uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'es' ? 'Enviando...' : 'Sending...'}
                      </span>
                    ) : (
                      `⚡ ${t.contact.sendBtn}`
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
