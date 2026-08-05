'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  createdAt: string;
  contacted: boolean;
  source: string;
}

interface Stats {
  total: number;
  thisMonth: number;
  thisWeek: number;
  today: number;
  contacted: number;
  pending: number;
}

type FilterType = 'all' | 'pending' | 'contacted';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [storedPassword, setStoredPassword] = useState('');

  const fetchLeads = useCallback(async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { 'x-admin-password': pwd },
      });
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setLeads(data.leads);
      setStats(data.stats);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setStoredPassword(password);
        setLeads(data.leads);
        setStats(data.stats);
        sessionStorage.setItem('admin_pwd', password);
      } else {
        setAuthError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch {
      setAuthError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pwd');
    if (saved) {
      setPassword(saved);
      setStoredPassword(saved);
      fetchLeads(saved).then(() => setIsAuthenticated(true));
    }
  }, [fetchLeads]);

  const toggleContacted = async (lead: Lead) => {
    const updated = { ...lead, contacted: !lead.contacted };
    setLeads(prev => prev.map(l => l.id === lead.id ? updated : l));
    if (selectedLead?.id === lead.id) setSelectedLead(updated);

    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': storedPassword,
      },
      body: JSON.stringify({ id: lead.id, contacted: !lead.contacted }),
    });

    // Refresh stats
    fetchLeads(storedPassword);
  };

  const deleteLead = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este lead?')) return;
    setLeads(prev => prev.filter(l => l.id !== id));
    setSelectedLead(null);
    await fetch('/api/admin/leads', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': storedPassword,
      },
      body: JSON.stringify({ id }),
    });
    fetchLeads(storedPassword);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Servicio', 'Mensaje', 'Fecha', 'Contactado'];
    const rows = filteredLeads.map(l => [
      l.id, l.name, l.email, l.phone || '', l.company || '',
      l.service || '', `"${l.message.replace(/"/g, '""')}"`,
      new Date(l.createdAt).toLocaleString('es-CO'),
      l.contacted ? 'Sí' : 'No'
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const logout = () => {
    sessionStorage.removeItem('admin_pwd');
    setIsAuthenticated(false);
    setPassword('');
    setStoredPassword('');
    setLeads([]);
    setStats(null);
  };

  const filteredLeads = leads
    .filter(l => {
      if (filter === 'pending') return !l.contacted;
      if (filter === 'contacted') return l.contacted;
      return true;
    })
    .filter(l => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q) ||
        l.service?.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q)
      );
    });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);
    if (diffMin < 60) return `hace ${diffMin} min`;
    if (diffH < 24) return `hace ${diffH}h`;
    if (diffD < 7) return `hace ${diffD}d`;
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // ─── LOGIN SCREEN ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30 mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-1">Daniel Caicedo — Gestión de Leads</p>
          </div>

          {/* Login card */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Contraseña de Acceso
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-purple-500/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 bg-slate-950 text-white placeholder-slate-600 text-sm transition-all"
                />
              </div>

              <AnimatePresence>
                {authError && (
                  <motion.div
                    className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-500/30 rounded-xl text-red-300 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <span>⚠️</span> {authError}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                    Acceder al Panel
                  </span>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6 font-mono">
            Acceso restringido — Solo personal autorizado
          </p>
        </motion.div>
      </div>
    );
  }

  // ─── DASHBOARD ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* ─── TOPBAR ─── */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-purple-900/30 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h1 className="font-black text-white text-sm sm:text-base leading-tight">Lead Admin Panel</h1>
              <p className="text-xs text-slate-500 font-mono">Daniel Caicedo</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => fetchLeads(storedPassword)}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-all"
              title="Actualizar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button
              onClick={exportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Exportar CSV
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-950/20 border border-slate-800 hover:border-red-800/40 rounded-lg transition-all"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* ─── STATS GRID ─── */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Total Leads', value: stats.total, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, color: 'from-purple-600/20 to-purple-700/10', border: 'border-purple-500/30', text: 'text-purple-300' },
              { label: 'Este Mes', value: stats.thisMonth, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'from-cyan-600/20 to-cyan-700/10', border: 'border-cyan-500/30', text: 'text-cyan-300' },
              { label: 'Esta Semana', value: stats.thisWeek, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, color: 'from-blue-600/20 to-blue-700/10', border: 'border-blue-500/30', text: 'text-blue-300' },
              { label: 'Hoy', value: stats.today, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, color: 'from-orange-600/20 to-orange-700/10', border: 'border-orange-500/30', text: 'text-orange-300' },
              { label: 'Contactados', value: stats.contacted, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'from-emerald-600/20 to-emerald-700/10', border: 'border-emerald-500/30', text: 'text-emerald-300' },
              { label: 'Pendientes', value: stats.pending, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'from-yellow-600/20 to-yellow-700/10', border: 'border-yellow-500/30', text: 'text-yellow-300' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-4 text-center`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className={`text-2xl font-black ${stat.text}`}>{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── FILTERS & SEARCH ─── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-1 w-fit">
            {(['all', 'pending', 'contacted'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f === 'all' ? `Todos (${leads.length})` : f === 'pending' ? `Pendientes (${stats?.pending ?? 0})` : `Contactados (${stats?.contacted ?? 0})`}
              </button>
            ))}
          </div>

          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Buscar por nombre, email, empresa..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 rounded-xl text-sm text-white placeholder-slate-500 transition-all"
            />
          </div>

          <button
            onClick={exportCSV}
            className="sm:hidden flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all hover:bg-slate-800"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            CSV
          </button>
        </div>

        {/* ─── LEADS LAYOUT (list + detail) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* ─── LEADS LIST ─── */}
          <div className="lg:col-span-2 space-y-2">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-slate-500">
                <span className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mr-3" />
                Cargando leads...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <svg className="w-7 h-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                </div>
                <p className="font-medium">
                  {searchQuery ? 'No se encontraron resultados' : 'Aún no hay leads'}
                </p>
                <p className="text-xs mt-1">
                  {searchQuery ? 'Prueba con otra búsqueda' : 'Los leads aparecerán aquí cuando alguien llene el formulario'}
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredLeads.map((lead, i) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setSelectedLead(lead)}
                    className={`relative cursor-pointer p-4 rounded-2xl border transition-all ${
                      selectedLead?.id === lead.id
                        ? 'bg-purple-950/60 border-purple-500/60 shadow-lg shadow-purple-500/10'
                        : 'bg-slate-900/60 border-slate-800/60 hover:bg-slate-900 hover:border-purple-500/30'
                    }`}
                  >
                    {/* Indicador pendiente */}
                    {!lead.contacted && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}

                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-sm font-black text-white flex-shrink-0 shadow">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-sm text-white truncate">{lead.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{formatDate(lead.createdAt)}</span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{lead.email}</p>
                        {lead.service && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] font-bold rounded-md">
                            {lead.service}
                          </span>
                        )}
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{lead.message}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.contacted
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-yellow-950/60 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {lead.contacted ? 'Contactado' : 'Pendiente'}
                      </span>
                      {lead.company && (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 truncate max-w-[120px]">
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          {lead.company}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* ─── LEAD DETAIL ─── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedLead ? (
                <motion.div
                  key={selectedLead.id}
                  className="bg-slate-900/70 backdrop-blur-md border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Detail header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-xl font-black text-white shadow-lg">
                        {selectedLead.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-white">{selectedLead.name}</h2>
                        <p className="text-xs text-slate-400 font-mono">
                          {new Date(selectedLead.createdAt).toLocaleString('es-CO', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-slate-500 hover:text-slate-300 hover:bg-slate-800 p-2 rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  {/* Fields grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Email', value: selectedLead.email, href: `mailto:${selectedLead.email}`, icon: <svg className="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                      selectedLead.phone ? { label: 'Teléfono', value: selectedLead.phone, href: `tel:${selectedLead.phone}`, icon: <svg className="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> } : null,
                      selectedLead.company ? { label: 'Empresa', value: selectedLead.company, icon: <svg className="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> } : null,
                      selectedLead.service ? { label: 'Servicio', value: selectedLead.service, icon: <svg className="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> } : null,
                    ].filter(Boolean).map((field, i) => field && (
                      <div key={i} className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                        <p className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">{field.icon} {field.label}</p>
                        {field.href ? (
                          <a href={field.href} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 break-all transition-colors">
                            {field.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-white">{field.value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <p className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> Mensaje</p>
                    <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedLead.message}
                    </div>
                  </div>

                  {/* Source */}
                  <div className="mb-6">
                    <p className="flex items-center gap-1 text-[10px] font-mono text-slate-600">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      Fuente: <span className="text-slate-500 truncate">{selectedLead.source || 'Directo'}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selectedLead.email}?subject=Re: Tu consulta — Daniel Caicedo`}
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Responder por Email
                    </a>
                    {selectedLead.phone && (
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=Hola ${selectedLead.name}, soy Daniel Caicedo...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 font-bold text-sm rounded-xl hover:bg-emerald-900/60 transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </a>
                    )}
                    <button
                      onClick={() => toggleContacted(selectedLead)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 font-bold text-sm rounded-xl border transition-all ${
                        selectedLead.contacted
                          ? 'bg-yellow-950/40 border-yellow-500/40 text-yellow-300 hover:bg-yellow-950/60'
                          : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60'
                      }`}
                    >
                      {selectedLead.contacted ? (
                        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Marcar Pendiente</>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Marcar Contactado</>
                      )}
                    </button>
                    <button
                      onClick={() => deleteLead(selectedLead.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-red-950/30 border border-red-500/30 text-red-400 font-bold text-sm rounded-xl hover:bg-red-950/50 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="h-64 flex flex-col items-center justify-center text-slate-600 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
                    <svg className="w-7 h-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                  </div>
                  <p className="font-medium">Selecciona un lead para ver detalles</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
