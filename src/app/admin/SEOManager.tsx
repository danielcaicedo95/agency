'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageSEO, HreflangItem } from '@/lib/seo-defaults';

interface SEOManagerProps {
  adminPassword: string;
}

// ─── JSON-LD PRESET TEMPLATES ────────────────────────────────────────────────
const SCHEMA_TEMPLATES = {
  Person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daniel Caicedo',
    jobTitle: 'Especialista en SEO, SEM & Automatización IA',
    url: 'https://danielcaicedo.com',
    email: 'danielcaicedoco@gmail.com',
    sameAs: ['https://linkedin.com', 'https://github.com'],
  },
  Organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Daniel Caicedo — SEO & AI Agency',
    url: 'https://danielcaicedo.com',
    logo: 'https://danielcaicedo.com/favicon.ico',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'danielcaicedoco@gmail.com',
      contactType: 'customer service',
    },
  },
  Service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Consultoría SEO Técnico & SEM',
    provider: {
      '@type': 'Person',
      name: 'Daniel Caicedo',
    },
    areaServed: 'Global',
    description: 'Servicios especializados de auditoría SEO técnico, optimización de velocidad WPO, Google Ads y automatización con IA.',
  },
  WebPage: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Título de la Página',
    description: 'Descripción optimizada para buscadores.',
    url: 'https://danielcaicedo.com',
  },
  BreadcrumbList: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://danielcaicedo.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servicios',
        item: 'https://danielcaicedo.com/services',
      },
    ],
  },
};

export default function SEOManager({ adminPassword }: SEOManagerProps) {
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('/');
  const [saving, setSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [newPathInput, setNewPathInput] = useState<string>('');
  const [isAddingPage, setIsAddingPage] = useState<boolean>(false);

  // Form State for active selected page
  const [form, setForm] = useState<PageSEO>({
    path: '/',
    title: '',
    description: '',
    robots: 'index, follow',
    canonicalUrl: 'https://danielcaicedo.com',
    hreflangs: [
      { lang: 'es', url: 'https://danielcaicedo.com' },
      { lang: 'en', url: 'https://danielcaicedo.com/en' },
      { lang: 'x-default', url: 'https://danielcaicedo.com' },
    ],
    jsonLd: '',
  });

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/seo', {
        headers: { 'x-admin-password': adminPassword },
      });
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
        if (data.pages && data.pages.length > 0) {
          const first = data.pages.find((p: PageSEO) => p.path === selectedPath) || data.pages[0];
          setSelectedPath(first.path);
          setForm(first);
        }
      }
    } catch (err) {
      console.error('Error fetching SEO pages:', err);
    }
  }, [adminPassword, selectedPath]);

  // Fetch all pages on mount
  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Switch active selected page
  const handleSelectPage = (path: string) => {
    setSelectedPath(path);
    const target = pages.find((p) => p.path === path);
    if (target) {
      setForm(target);
      setJsonError(null);
      setSaveMessage(null);
    }
  };

  // Auto generate Hreflangs for form
  const handleAutoHreflangs = () => {
    const currentPath = form.path || '/';
    const isEn = currentPath.startsWith('/en');
    let esPath = currentPath;
    let enPath = currentPath;

    if (isEn) {
      esPath = currentPath.replace(/^\/en/, '') || '/';
    } else {
      enPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
    }

    const baseUrl = 'https://danielcaicedo.com';
    const generated: HreflangItem[] = [
      { lang: 'es', url: `${baseUrl}${esPath === '/' ? '' : esPath}` },
      { lang: 'en', url: `${baseUrl}${enPath}` },
      { lang: 'x-default', url: `${baseUrl}${esPath === '/' ? '' : esPath}` },
    ];

    setForm({ ...form, hreflangs: generated });
  };

  // Add Hreflang item
  const handleAddHreflang = () => {
    setForm({
      ...form,
      hreflangs: [...(form.hreflangs || []), { lang: '', url: '' }],
    });
  };

  // Update Hreflang item
  const handleUpdateHreflang = (index: number, key: 'lang' | 'url', val: string) => {
    const updated = [...(form.hreflangs || [])];
    updated[index][key] = val;
    setForm({ ...form, hreflangs: updated });
  };

  // Remove Hreflang item
  const handleRemoveHreflang = (index: number) => {
    const updated = form.hreflangs.filter((_, i) => i !== index);
    setForm({ ...form, hreflangs: updated });
  };

  // Apply JSON Schema Template
  const handleApplyTemplate = (templateName: keyof typeof SCHEMA_TEMPLATES) => {
    const templateData = SCHEMA_TEMPLATES[templateName];
    setForm({
      ...form,
      jsonLd: JSON.stringify(templateData, null, 2),
    });
    setJsonError(null);
  };

  // Validate JSON string
  const handleValidateJson = () => {
    if (!form.jsonLd || !form.jsonLd.trim()) {
      setJsonError(null);
      return true;
    }
    try {
      JSON.parse(form.jsonLd);
      setJsonError(null);
      setSaveMessage({ type: 'success', text: '✓ JSON-LD es 100% válido' });
      setTimeout(() => setSaveMessage(null), 3000);
      return true;
    } catch (e: unknown) {
      setJsonError(e instanceof Error ? e.message : 'JSON inválido');
      return false;
    }
  };

  // Save Page Metadata
  const handleSave = async () => {
    if (form.jsonLd && form.jsonLd.trim() && !handleValidateJson()) {
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaveMessage({ type: 'success', text: '¡Metadatos guardados y aplicados correctamente!' });
        fetchPages();
      } else {
        const err = await res.json();
        setSaveMessage({ type: 'error', text: err.error || 'Error al guardar metadatos' });
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'Error de conexión con el servidor' });
    } finally {
      setSaving(false);
    }
  };

  // Reset custom page metadata to automatic default
  const handleResetDefault = async () => {
    if (!confirm(`¿Restablecer metadatos de ${form.path} a los valores automáticos?`)) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/seo?path=${encodeURIComponent(form.path)}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword },
      });

      if (res.ok) {
        setSaveMessage({ type: 'success', text: 'Restablecido a automático' });
        fetchPages();
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'Error al restablecer' });
    } finally {
      setSaving(false);
    }
  };

  // Add a new custom page path
  const handleCreateNewPage = () => {
    if (!newPathInput.trim()) return;
    let cleanPath = newPathInput.trim();
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;

    const newPageSeo: PageSEO = {
      path: cleanPath,
      title: `Página ${cleanPath} | Daniel Caicedo`,
      description: `Descripción para la página ${cleanPath}.`,
      robots: 'index, follow',
      canonicalUrl: `https://danielcaicedo.com${cleanPath}`,
      hreflangs: [
        { lang: 'es', url: `https://danielcaicedo.com${cleanPath}` },
        { lang: 'en', url: `https://danielcaicedo.com/en${cleanPath}` },
        { lang: 'x-default', url: `https://danielcaicedo.com${cleanPath}` },
      ],
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Página ${cleanPath}`,
          url: `https://danielcaicedo.com${cleanPath}`,
        },
        null,
        2
      ),
      isCustom: true,
    };

    setForm(newPageSeo);
    setSelectedPath(cleanPath);
    setPages([...pages, newPageSeo]);
    setIsAddingPage(false);
    setNewPathInput('');
  };

  // Character length indicators
  const titleLen = form.title ? form.title.length : 0;
  const descLen = form.description ? form.description.length : 0;

  return (
    <div className="space-y-6">
      {/* ─── HEADER BAR & PAGE SELECTOR ─── */}
      <div className="bg-slate-900/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-purple-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Gestor de Metadatos & SEO On-Page
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Configura los títulos, descripciones, robots, canonicas, hreflangs y schemas JSON-LD para cada URL de tu sitio.
            </p>
          </div>

          <button
            onClick={() => setIsAddingPage(!isAddingPage)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            + Nueva Página / Slug
          </button>
        </div>

        {/* MODAL / ROW TO ADD CUSTOM PATH */}
        {isAddingPage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row gap-3 items-center"
          >
            <div className="flex-1 w-full">
              <label className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Ruta de la URL (Ej: /blog/seo-tecnico o /landing-promo)
              </label>
              <input
                type="text"
                value={newPathInput}
                onChange={(e) => setNewPathInput(e.target.value)}
                placeholder="/tu-nueva-pagina"
                className="w-full px-3.5 py-2 bg-slate-900 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0">
              <button
                onClick={handleCreateNewPage}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition-colors w-full sm:w-auto"
              >
                Crear Página
              </button>
              <button
                onClick={() => setIsAddingPage(false)}
                className="px-3 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}

        {/* SELECTOR DE PÁGINAS EXISTENTES */}
        <div className="flex flex-wrap gap-2 pt-2">
          {pages.map((p) => {
            const isSelected = p.path === selectedPath;
            return (
              <button
                key={p.path}
                onClick={() => handleSelectPage(p.path)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-950/60 border-purple-500/20 text-slate-400 hover:text-slate-200 hover:bg-slate-950'
                }`}
              >
                <span>{p.path}</span>
                {p.isCustom ? (
                  <span className="w-2 h-2 rounded-full bg-cyan-400" title="Metadatos personalizados" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" title="Valores automáticos por defecto" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── LIVE GOOGLE SERP PREVIEW ─── */}
      <div className="bg-slate-900/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-purple-500/20 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Previsualización en Google Search Result
          </span>
          <span className="text-[10px] text-cyan-400">Desktop / Mobile Live SERP</span>
        </div>

        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-purple-500/30 font-sans space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
              D
            </div>
            <span className="font-medium text-slate-300">danielcaicedo.com</span>
            <span className="text-slate-500">› {form.path === '/' ? '' : form.path.replace(/^\//, '')}</span>
          </div>
          <h3 className="text-lg font-bold text-cyan-300 hover:underline cursor-pointer leading-snug">
            {form.title || 'Título de la página no configurado'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
            {form.description || 'Agrega una metadescripción atractiva que motive el clic de los usuarios en los resultados de búsqueda de Google.'}
          </p>
        </div>
      </div>

      {/* ─── FORM EDITOR ─── */}
      <div className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-purple-500/20 space-y-6">
        {/* ROW 1: SLUG & META ROBOTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
              URL Path / Slug
            </label>
            <input
              type="text"
              value={form.path}
              onChange={(e) => setForm({ ...form, path: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
              Meta Robots Indexación
            </label>
            <select
              value={form.robots}
              onChange={(e) => setForm({ ...form, robots: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="index, follow">index, follow (Recomendado - Google Indexa y Sigue enlaces)</option>
              <option value="noindex, follow">noindex, follow (No indexar en Google, pero seguir enlaces)</option>
              <option value="index, nofollow">index, nofollow (Indexar en Google, sin seguir enlaces)</option>
              <option value="noindex, nofollow">noindex, nofollow (Ocultar completamente)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
              Estado de la Metadata
            </label>
            <div className="px-4 py-2.5 bg-slate-950 border border-purple-500/20 rounded-xl text-xs font-mono flex items-center justify-between">
              <span className="text-slate-400">Tipo de regla:</span>
              <span className={form.isCustom ? 'text-cyan-400 font-bold' : 'text-slate-500 font-bold'}>
                {form.isCustom ? 'Personalizada (Custom)' : 'Automática (Default)'}
              </span>
            </div>
          </div>
        </div>

        {/* TITLE FIELD */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
              Título SEO ({"<title>"})
            </label>
            <span
              className={`text-xs font-mono font-bold ${
                titleLen >= 50 && titleLen <= 60
                  ? 'text-emerald-400'
                  : titleLen > 60
                  ? 'text-red-400'
                  : 'text-yellow-400'
              }`}
            >
              {titleLen} / 60 caracteres {titleLen >= 50 && titleLen <= 60 && '✓ Excelente'}
            </span>
          </div>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Título optimizado con palabra clave principal"
            className="w-full px-4 py-3 bg-slate-950 border border-purple-500/30 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* DESCRIPTION FIELD */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
              Meta Descripción ({"<meta name=\"description\">"})
            </label>
            <span
              className={`text-xs font-mono font-bold ${
                descLen >= 130 && descLen <= 160
                  ? 'text-emerald-400'
                  : descLen > 160
                  ? 'text-red-400'
                  : 'text-yellow-400'
              }`}
            >
              {descLen} / 160 caracteres {descLen >= 130 && descLen <= 160 && '✓ Excelente'}
            </span>
          </div>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Descripción atractiva con call to action e intención de búsqueda..."
            className="w-full px-4 py-3 bg-slate-950 border border-purple-500/30 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors resize-y leading-relaxed"
          />
        </div>

        {/* CANONICAL URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block">
            URL Canónica ({"<link rel=\"canonical\">"})
          </label>
          <input
            type="text"
            value={form.canonicalUrl}
            onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
            placeholder="https://danielcaicedo.com/pagina"
            className="w-full px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* HREFLANG LIST */}
        <div className="space-y-3 pt-2 border-t border-purple-900/40">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                Idiomas Alternativos (`hreflang`)
              </label>
              <p className="text-[11px] text-slate-400">
                Enlaces de localización para motores de búsqueda (ej: es, en, x-default).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoHreflangs}
                className="px-3 py-1.5 bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold rounded-lg hover:bg-purple-900 transition-colors"
              >
                ⚡ Auto-generar
              </button>
              <button
                type="button"
                onClick={handleAddHreflang}
                className="px-3 py-1.5 bg-slate-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold rounded-lg hover:bg-slate-900 transition-colors"
              >
                + Agregar Idioma
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {form.hreflangs && form.hreflangs.length > 0 ? (
              form.hreflangs.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-slate-950 p-2.5 rounded-xl border border-purple-500/20">
                  <input
                    type="text"
                    value={item.lang}
                    onChange={(e) => handleUpdateHreflang(idx, 'lang', e.target.value)}
                    placeholder="es / en / x-default"
                    className="w-28 sm:w-36 px-3 py-1.5 bg-slate-900 border border-purple-500/30 rounded-lg text-xs font-mono text-cyan-300 uppercase focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleUpdateHreflang(idx, 'url', e.target.value)}
                    placeholder="https://danielcaicedo.com/..."
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-purple-500/30 rounded-lg text-xs font-mono text-slate-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHreflang(idx)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 font-mono italic">No hay enlaces hreflang configurados.</p>
            )}
          </div>
        </div>

        {/* JSON-LD SCHEMA EDITOR */}
        <div className="space-y-3 pt-4 border-t border-purple-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                Datos Estructurados (JSON-LD Schema)
              </label>
              <p className="text-[11px] text-slate-400">
                Añade marcado rich snippets (Person, Service, WebPage, BreadcrumbList).
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['Person', 'Organization', 'Service', 'WebPage', 'BreadcrumbList'] as const).map((tmpl) => (
                <button
                  key={tmpl}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="px-2.5 py-1 bg-slate-950 border border-purple-500/30 text-purple-300 hover:text-cyan-300 text-[10px] font-mono rounded-lg transition-colors"
                >
                  + {tmpl}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={8}
              value={form.jsonLd || ''}
              onChange={(e) => {
                setForm({ ...form, jsonLd: e.target.value });
                setJsonError(null);
              }}
              placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Person"...\n}'
              className="w-full p-4 bg-slate-950 border border-purple-500/30 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 leading-relaxed"
            />

            <button
              type="button"
              onClick={handleValidateJson}
              className="absolute top-3 right-3 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-xs font-mono font-bold text-slate-300 rounded-md transition-colors"
            >
              Validar JSON
            </button>
          </div>

          {jsonError && (
            <p className="text-xs font-mono text-red-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error de sintaxis JSON: {jsonError}
            </p>
          )}
        </div>

        {/* SAVE MESSAGE NOTIFICATION */}
        <AnimatePresence>
          {saveMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between border ${
                saveMessage.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/60 border-red-500/40 text-red-300'
              }`}
            >
              <span>{saveMessage.text}</span>
              <button onClick={() => setSaveMessage(null)} className="text-xs underline">
                Cerrar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-purple-900/40">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 min-w-[200px] py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando...
              </span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Guardar Metadatos para {form.path}
              </>
            )}
          </button>

          {form.isCustom && (
            <button
              type="button"
              onClick={handleResetDefault}
              disabled={saving}
              className="px-5 py-3.5 bg-slate-950 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 font-bold rounded-xl transition-all text-sm"
            >
              Restablecer a Automático
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
