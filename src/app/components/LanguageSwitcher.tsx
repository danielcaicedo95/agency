'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-purple-200/50">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
          language === 'es'
            ? 'bg-purple-900 text-white shadow-sm'
            : 'text-gray-600 hover:text-purple-900'
        }`}
      >
        <span>🇪🇸</span> ES
      </motion.button>
      <span className="text-gray-300">|</span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-purple-900 text-white shadow-sm'
            : 'text-gray-600 hover:text-purple-900'
        }`}
      >
        <span>🇺🇸</span> EN
      </motion.button>
    </div>
  );
}
