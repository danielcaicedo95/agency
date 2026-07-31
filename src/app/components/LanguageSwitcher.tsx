'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-full border border-purple-500/30 shadow-lg">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-full transition-all flex items-center gap-1.5 ${
          language === 'es'
            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
            : 'text-slate-400 hover:text-white'
        }`}
        title="Cambiar a Español"
      >
        <span className="text-sm">🇪🇸</span>
        <span>ES</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-full transition-all flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
            : 'text-slate-400 hover:text-white'
        }`}
        title="Switch to English"
      >
        <span className="text-sm">🇺🇸</span>
        <span>EN</span>
      </motion.button>
    </div>
  );
}
