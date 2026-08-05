'use client';

import Navbar from '@/app/components/Navbar';
import CasosExitoGSC from '@/app/components/work/CasosExitoGSC';

export default function CasosDeExitoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* CASOS DE ÉXITO GSC SHOWCASE CON UN ÚNICO TÍTULO UNIFICADO */}
        <CasosExitoGSC isCompact={false} showTitle={true} />
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 font-mono border-t border-slate-900">
        © {new Date().getFullYear()} Daniel Caicedo — SEO, SEM & AI Automation
      </footer>
    </div>
  );
}
