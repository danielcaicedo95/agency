'use client';

import Navbar from '@/app/components/Navbar';
import { useLanguage } from '@/app/context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
function SkillBar({ name, pct, color = 'from-purple-500 to-cyan-400', delay = 0 }: {
  name: string; pct: number; color?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-200">{name}</span>
        <span className="text-xs font-mono font-bold text-cyan-400">{pct}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color} shadow-sm`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

// ─── TECH PILL (con logo SVG) ─────────────────────────────────────────────────
function TechPill({ name, logo, color = 'border-purple-500/30 text-slate-200' }: {
  name: string; logo: React.ReactNode; color?: string;
}) {
  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-2 bg-slate-900/80 border ${color} rounded-xl text-xs font-semibold hover:scale-105 hover:border-cyan-400/60 transition-all cursor-default`}
      whileHover={{ y: -2 }}
    >
      <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">{logo}</span>
      <span>{name}</span>
    </motion.div>
  );
}

// ─── LOGOS SVG INLINE ─────────────────────────────────────────────────────────
const logos = {
  claude: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#CC785C"/>
      <path d="M8 12.5c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" fill="white"/>
    </svg>
  ),
  opencode: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-purple-400">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  antigravity: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="url(#ag)"/>
      <defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
      <path d="M8 16l4-8 4 8M9.5 13h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
      <path d="M12 2L24 22H0L12 2z"/>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <circle cx="12" cy="12" r="12" fill="black"/>
      <path d="M6.5 8.5h2.5v6.2l6-6.2h2.5L11 16.5v-5l-2 2.3V20L6.5 17V8.5z" fill="white"/>
    </svg>
  ),
  nestjs: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M11.6 2c-.3 0-.6.1-.8.2L4 6.3c-.5.3-.8.8-.8 1.4v8.6c0 .6.3 1.1.8 1.4l6.8 4c.5.3 1.1.3 1.6 0l6.8-4c.5-.3.8-.8.8-1.4V7.7c0-.6-.3-1.1-.8-1.4L12.4 2.2c-.2-.1-.5-.2-.8-.2z" fill="#E0234E"/>
      <path d="M16.5 9.5c-.3-.4-.8-.6-1.3-.5-.3.1-.6.3-.8.6l-2.9 5-1.5-2.6h1.2l.7-1.2H9.4l-1.8 3.1c-.2.4-.2.9 0 1.3.2.4.6.7 1.1.7h4.6c.4 0 .8-.2 1.1-.5l2.1-3.6c.3-.5.2-1.1-.2-1.5" fill="white"/>
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#009688"/>
      <path d="M12 5l-1 7h4l-5 7 1-8H7l5-6z" fill="white"/>
    </svg>
  ),
  django: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <rect width="24" height="24" rx="4" fill="#092E20"/>
      <path d="M13 4h2.5v11.5c0 3-1.4 4-3.5 4-.5 0-1 0-1.5-.2v-2c.3.1.6.1.9.1.9 0 1.6-.3 1.6-2V4zM9 8h2.5v11h-2.5V8z" fill="#44B78B"/>
    </svg>
  ),
  render: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#46E3B7"/>
      <path d="M8 16V8l8 8-8-4v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  wordpress: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#21759B"/>
      <path d="M2.2 12c0 4.3 2.5 8 6.1 9.8L2.9 8.2A9.8 9.8 0 002.2 12zm16.9-.4c0-1.3-.5-2.3-1-3a5 5 0 01-1-3.1c0-1.2 1-2.3 2.3-2.3A9.8 9.8 0 0012 2.2c-3.3 0-6.2 1.7-8 4.2.2 0 .5.1.7.1 1.1 0 2.9-.1 2.9-.1.6 0 .6.9.1.9 0 0-.6.1-1.2.1l3.9 11.7 2.4-7.1-1.7-4.6c-.6 0-1.1-.1-1.1-.1-.6 0-.5-.9.1-.9 0 0 1.8.1 2.9.1 1.1 0 2.9-.1 2.9-.1.6 0 .6.9.1.9 0 0-.6.1-1.2.1l3.9 11.5 1-3.5c.6-1.7.9-2.9.9-3.9zM12.2 13l-3.2 9.4c1 .3 2 .4 3 .4 1.2 0 2.4-.2 3.5-.6l-.1-.2-3.2-9zm7.7-5.1A9.8 9.8 0 0122 12c0 3.6-1.9 6.7-4.8 8.5L21.1 9c.3.9.5 1.9.5 2.9 0-.9-.2-1.8-.5-2.7l-.2-1.3z" fill="white"/>
    </svg>
  ),
  shopify: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M15.3 2.1s-.2 0-.3.1c-.1 0-1.5.4-1.5.4s-1-.9-1.1-1c-.3-.2-.7-.3-1.1-.2L9.2 2C7.9 5.6 7 8.5 7 8.5l4.5 1.3s.7-2.5 1-3.4c.3.1.7.3.7.9v.5l-1.7 6.5s.6.2 1.4.2c.7 0 1-.2 1-.2l1.3-5.1.5 5.3s.3.1.7.1c1.7 0 2.5-1.5 2.5-1.5L17.5 4c0 0-.5-1.5-1.7-1.8-.1-.1-.3-.1-.5-.1z" fill="#96BF48"/>
      <path d="M7 8.5L4 9.5S3 13 5.5 14c1 .4 1.5.4 1.5.4V12.5c-1-.4-1.3-1.5-1-2.3L7 8.5z" fill="#5E8E3E"/>
      <path d="M14.5 2.5c.3.1.5.3.7.6L14 3.5c-.2-.4-.5-.7-.5-.7l1-.3z" fill="#C6EDB0"/>
    </svg>
  ),
  tinacms: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#EC4815"/>
      <path d="M8 7h8M12 7v10M9 17h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  drupal: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M15.8 3.7C14.4 2.6 13 1.9 12 1.5c0 .9-.2 1.9-1 2.8C9.3 6.1 7.2 6.5 5.7 8c-1.6 1.5-2.2 3.5-2.2 5.3 0 4.4 3.7 8 8.2 8s8.2-3.6 8.2-8.1c0-3.9-2.1-7.6-4.1-9.5zM8.5 17.8c-.6.4-1.3.2-1.7-.4-.4-.6-.2-1.3.4-1.7.6-.4 1.3-.2 1.7.4.4.5.2 1.3-.4 1.7zm3-3.6c-.5 0-1.8-.1-2.5-1.3-.7-1.1-.3-2.4.2-3.1 0 1.1.5 2 1.5 2.3-.1-.9.2-1.9.8-2.7.5.9 1.3 1.5 1.3 2.7 0 0 .5-.4.6-1.4.5.5.9 1.4.9 2.1 0 1.2-1 2.4-2.8 2.4z" fill="#0678BE"/>
    </svg>
  ),
  prestashop: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#DF0067"/>
      <path d="M8 10.5a4 4 0 000 3h8a4 4 0 000-3H8z" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="#DF0067"/>
    </svg>
  ),
  joomla: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M6 2.5C4.1 2.5 2.5 4.1 2.5 6s1.6 3.5 3.5 3.5c.5 0 1-.1 1.4-.3L9.5 11l-1.8 1.8c-.4-.2-.9-.3-1.4-.3C4.1 12.5 2.5 14.1 2.5 16s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-.5-.1-1-.3-1.4L11 12.8l1.8 1.8c-.2.4-.3.9-.3 1.4 0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5c-.5 0-1 .1-1.4.3L12.8 11l1.8-1.8c.4.2.9.3 1.4.3 1.9 0 3.5-1.6 3.5-3.5S17.9 2.5 16 2.5s-3.5 1.6-3.5 3.5c0 .5.1 1 .3 1.4L11 9.2 9.2 7.4c.2-.4.3-.9.3-1.4C9.5 4.1 7.9 2.5 6 2.5z" fill="#F44321"/>
    </svg>
  ),
  magento: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.4l6.5 3.8v7.5L12 19.4l-6.5-3.7V8.2L12 4.4zm0 2.1L7.5 9v6l4.5 2.7V9.6L12 8l-.5-.5zm1 0v8.3L17.5 15V9L13 6.5z" fill="#F26322"/>
    </svg>
  ),
  ga4: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect width="24" height="24" rx="4" fill="#E37400"/>
      <circle cx="8" cy="12" r="3" fill="white"/>
      <rect x="13" y="7" width="4" height="10" rx="2" fill="white"/>
    </svg>
  ),
  gtm: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect width="24" height="24" rx="4" fill="#4285F4"/>
      <path d="M12 4l4 8-4 8-4-8 4-8z" fill="white"/>
      <path d="M8 12h8" stroke="#4285F4" strokeWidth="2"/>
    </svg>
  ),
  semrush: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#FF642D"/>
      <path d="M8 15l4-10 4 10M9.5 12h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ahrefs: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#FF7B00"/>
      <path d="M7 17l5-10 5 10M9 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  googleads: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M2 17.5L8.5 6 12 12.5 15.5 6 22 17.5H2z" fill="none"/>
      <path d="M2 17.5L8.5 6l3.5 6.5" fill="#FABC05"/>
      <path d="M8.5 6L12 12.5 15.5 6 22 17.5H15a3 3 0 01-3-3 3 3 0 01-3 3H2L8.5 6z" fill="#34A853"/>
      <circle cx="19" cy="17.5" r="2.5" fill="#EA4335"/>
      <circle cx="5" cy="17.5" r="2.5" fill="#4285F4"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M12 2C8.7 2 9 3.5 9 3.5V7h6v1H6.5C5 8 3 9 3 12s2 3.5 2 3.5H7v-2S6.8 12 8.5 12H15c1.4 0 2.5-1.1 2.5-2.5v-5C17.5 3 15.3 2 12 2zm-1 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3776AB"/>
      <path d="M12 22c3.3 0 3-1.5 3-1.5V17H9v-1h8.5c1.5 0 3.5-1 3.5-4s-2-3.5-2-3.5H17v2s.2 1.5-1.5 1.5H9c-1.4 0-2.5 1.1-2.5 2.5v5C6.5 21 8.7 22 12 22zm1-1.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD43B"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  gsc: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect width="24" height="24" rx="4" fill="#4CAF50"/>
      <path d="M5 19L10 10l4 6 3-4 4 7H5z" fill="white"/>
    </svg>
  ),
  pipedrive: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fill="#172B4D"/>
      <circle cx="12" cy="9" r="3" fill="#00C853"/>
      <path d="M12 12v7" stroke="#00C853" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

export default function ServicesPage() {
  const { t, language } = useLanguage();

  const coreSkills = [
    { name: 'Technical SEO & On-Page', pct: 97, color: 'from-purple-500 to-cyan-400' },
    { name: 'Google Search Console (GSC)', pct: 96, color: 'from-purple-500 to-cyan-400' },
    { name: 'Google Ads / SEM', pct: 92, color: 'from-purple-500 to-cyan-400' },
    { name: 'Content Strategy & KWR', pct: 94, color: 'from-purple-500 to-cyan-400' },
    { name: 'Link Building & Off-Page', pct: 88, color: 'from-purple-600 to-purple-400' },
    { name: 'Local SEO & ASO', pct: 85, color: 'from-purple-600 to-purple-400' },
  ];

  const analyticsSkills = [
    { name: 'Google Analytics 4 (GA4)', pct: 95, color: 'from-orange-500 to-yellow-400' },
    { name: 'Google Tag Manager (GTM)', pct: 93, color: 'from-orange-500 to-yellow-400' },
    { name: 'Data Analysis & Reporting', pct: 91, color: 'from-orange-500 to-yellow-400' },
    { name: 'Pipedrive CRM', pct: 85, color: 'from-orange-500 to-yellow-400' },
  ];

  const devSkills = [
    { name: 'HTML / CSS / JavaScript', pct: 90, color: 'from-cyan-500 to-blue-400' },
    { name: 'Python (SEO scripts)', pct: 80, color: 'from-cyan-500 to-blue-400' },
    { name: 'React.js / Next.js', pct: 78, color: 'from-cyan-500 to-blue-400' },
    { name: 'FastAPI / NestJS / Django', pct: 70, color: 'from-cyan-500 to-blue-400' },
    { name: 'AI Prompting & Automation', pct: 93, color: 'from-emerald-500 to-cyan-400' },
  ];

  const aiTools = [
    { name: 'Claude Desktop / Code', logo: logos.claude },
    { name: 'Antigravity IDE', logo: logos.antigravity },
    { name: 'Open Code', logo: logos.opencode },
    { name: 'Python Scripts', logo: logos.python },
    { name: 'Pipedrive Automation', logo: logos.pipedrive },
    { name: 'Google Ads API', logo: logos.googleads },
  ];

  const analyticsTools = [
    { name: 'Google Analytics 4', logo: logos.ga4 },
    { name: 'Google Tag Manager', logo: logos.gtm },
    { name: 'Google Search Console', logo: logos.gsc },
    { name: 'SEMrush', logo: logos.semrush },
    { name: 'Ahrefs', logo: logos.ahrefs },
    { name: 'Google Ads', logo: logos.googleads },
  ];

  const devTools = [
    { name: 'Next.js', logo: logos.nextjs },
    { name: 'NestJS', logo: logos.nestjs },
    { name: 'FastAPI', logo: logos.fastapi },
    { name: 'Django', logo: logos.django },
    { name: 'React.js', logo: logos.react },
    { name: 'Vercel', logo: logos.vercel },
    { name: 'Render', logo: logos.render },
  ];

  const cmsTools = [
    { name: 'WordPress', logo: logos.wordpress },
    { name: 'Shopify Plus', logo: logos.shopify },
    { name: 'TinaCMS', logo: logos.tinacms },
    { name: 'Drupal', logo: logos.drupal },
    { name: 'PrestaShop', logo: logos.prestashop },
    { name: 'Joomla', logo: logos.joomla },
    { name: 'Magento', logo: logos.magento },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-20 w-full">

        {/* ─── HEADER ─── */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/30">
            TECHNICAL & STRATEGIC CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            {t.skills.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        {/* ─── CATEGORÍAS DE SERVICIOS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.skills.categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-500/20 hover:border-cyan-400/50 space-y-4 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-bold text-cyan-300 text-lg">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── SKILL BARS ─── */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">
              {language === 'es' ? 'Nivel de Dominio Técnico' : 'Technical Proficiency'}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {language === 'es' ? 'Más de 7 años de experiencia comprobada' : 'Over 7 years of proven experience'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SEO & Ads */}
            <motion.div
              className="bg-slate-900/80 border border-purple-500/20 rounded-3xl p-6 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">SEO & Ads</h3>
              </div>
              {coreSkills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 0.08} />
              ))}
            </motion.div>

            {/* Analytics & Data */}
            <motion.div
              className="bg-slate-900/80 border border-orange-500/20 rounded-3xl p-6 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Analytics & Data</h3>
              </div>
              {analyticsSkills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 0.08} />
              ))}
            </motion.div>

            {/* Dev & AI */}
            <motion.div
              className="bg-slate-900/80 border border-cyan-500/20 rounded-3xl p-6 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400" />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Dev & AI</h3>
              </div>
              {devSkills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 0.08} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── TECH STACK POR CATEGORÍAS ─── */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">
              {language === 'es' ? 'Stack Tecnológico Completo' : 'Full Technology Stack'}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {language === 'es' ? 'Herramientas que uso a diario en producción' : 'Tools I use daily in production'}
            </p>
          </div>

          {[
            {
              label: 'IA & Automatización',
              tools: aiTools,
              border: 'border-purple-500/20',
              dot: 'bg-gradient-to-r from-purple-500 to-pink-400',
            },
            {
              label: 'Analytics & SEO Tools',
              tools: analyticsTools,
              border: 'border-orange-500/20',
              dot: 'bg-gradient-to-r from-orange-500 to-yellow-400',
            },
            {
              label: 'Frameworks & Backend',
              tools: devTools,
              border: 'border-cyan-500/20',
              dot: 'bg-gradient-to-r from-cyan-500 to-blue-400',
            },
            {
              label: 'CMS & E-commerce',
              tools: cmsTools,
              border: 'border-emerald-500/20',
              dot: 'bg-gradient-to-r from-emerald-500 to-cyan-400',
            },
          ].map((group, gIdx) => (
            <motion.div
              key={group.label}
              className={`bg-slate-900/60 border ${group.border} rounded-3xl p-6 space-y-4`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gIdx * 0.08 }}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${group.dot}`} />
                <h3 className="font-bold text-white text-sm font-mono tracking-wider">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gIdx * 0.06 + i * 0.05 }}
                  >
                    <TechPill name={tool.name} logo={tool.logo} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
