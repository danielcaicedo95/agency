import { NextRequest, NextResponse } from 'next/server';
import { readLeads, saveLeads, Lead } from '@/app/api/leads/route';

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-password');
  return authHeader === process.env.ADMIN_PASSWORD;
}

// GET — Obtener todos los leads + estadísticas
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const leads = readLeads();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const stats = {
    total: leads.length,
    thisMonth: leads.filter(l => new Date(l.createdAt) >= startOfMonth).length,
    thisWeek: leads.filter(l => new Date(l.createdAt) >= startOfWeek).length,
    today: leads.filter(l => new Date(l.createdAt) >= startOfToday).length,
    contacted: leads.filter(l => l.contacted).length,
    pending: leads.filter(l => !l.contacted).length,
  };

  return NextResponse.json({ leads, stats });
}

// PATCH — Marcar lead como contactado/pendiente
export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await request.json();
  const { id, contacted } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  const leads = readLeads();
  const idx = leads.findIndex((l: Lead) => l.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
  }

  leads[idx].contacted = contacted;
  saveLeads(leads);

  return NextResponse.json({ success: true, lead: leads[idx] });
}

// DELETE — Eliminar un lead
export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  const leads = readLeads();
  const filtered = leads.filter((l: Lead) => l.id !== id);

  if (filtered.length === leads.length) {
    return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
  }

  saveLeads(filtered);
  return NextResponse.json({ success: true });
}
