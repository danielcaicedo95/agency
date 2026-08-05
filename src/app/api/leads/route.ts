import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface Lead {
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

/**
 * Ruta del archivo de leads.
 * - En Vercel (producción serverless) usamos /tmp que persiste durante la vida
 *   de la función lambda (no entre deploys, pero sí entre requests).
 * - En desarrollo usamos /data/leads.json que sí persiste.
 */
function getLeadsFilePath() {
  const isVercel = process.env.VERCEL === '1';
  if (isVercel) {
    return path.join('/tmp', 'leads.json');
  }
  return path.join(process.cwd(), 'data', 'leads.json');
}

export function readLeads(): Lead[] {
  try {
    const filePath = getLeadsFilePath();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export function saveLeads(leads: Lead[]): void {
  try {
    fs.writeFileSync(getLeadsFilePath(), JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error guardando leads:', err);
  }
}

function saveLead(lead: Lead): void {
  const leads = readLeads();
  leads.unshift(lead);
  saveLeads(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, service } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    // Crear el lead
    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: message.trim(),
      service: service?.trim() || undefined,
      createdAt: new Date().toISOString(),
      contacted: false,
      source: request.headers.get('referer') || 'direct',
    };

    // Guardar en archivo
    saveLead(lead);

    // Enviar email de notificación
    // NOTA: onboarding@resend.dev funciona siempre para tu propio email (sin verificar dominio)
    // Para enviar desde tu dominio, verifica danielcaicedo.co en resend.com > Domains
    const leadsEmail = process.env.LEADS_EMAIL || 'danielcaicedoco@gmail.com';

    await resend.emails.send({
      from: 'Daniel Caicedo Leads <onboarding@resend.dev>',
      to: [leadsEmail],
      replyTo: email,
      subject: `🔥 Nuevo Lead: ${name} — ${service || 'Consulta General'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', -apple-system, Arial, sans-serif; background: #0f172a; color: #e2e8f0; }
            .wrapper { padding: 32px 16px; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #7c3aed 0%, #0e7490 100%); padding: 32px 28px; border-radius: 16px 16px 0 0; text-align: center; }
            .badge { display: inline-block; background: rgba(0,0,0,0.25); color: #67e8f9; font-size: 11px; font-weight: 800; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(103,232,249,0.3); margin-bottom: 14px; letter-spacing: 0.08em; text-transform: uppercase; }
            .header h1 { margin: 0; font-size: 26px; color: #ffffff; font-weight: 900; line-height: 1.2; }
            .header p { margin: 8px 0 0; color: rgba(255,255,255,0.75); font-size: 13px; }
            .body { background: #1e293b; padding: 28px; border: 1px solid #334155; border-top: none; border-radius: 0 0 16px 16px; }
            .field { margin-bottom: 18px; }
            .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #22d3ee; margin-bottom: 6px; }
            .value { font-size: 15px; color: #f1f5f9; background: #0f172a; padding: 12px 16px; border-radius: 10px; border-left: 3px solid #7c3aed; word-break: break-word; }
            .value a { color: #67e8f9; text-decoration: none; }
            .message-box { background: #0f172a; padding: 16px; border-radius: 10px; border-left: 3px solid #22d3ee; font-size: 14px; color: #cbd5e1; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
            .divider { height: 1px; background: #334155; margin: 24px 0; }
            .cta { text-align: center; margin-top: 24px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #7c3aed, #0e7490); color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 800; font-size: 14px; }
            .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #475569; }
            .footer span { color: #22d3ee; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="badge">🚀 Nuevo Prospecto</div>
                <h1>¡Tienes un nuevo lead!</h1>
                <p>${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div class="body">
                <div class="field">
                  <div class="label">👤 Nombre</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `<div class="field"><div class="label">📱 Teléfono / WhatsApp</div><div class="value"><a href="https://wa.me/${phone.replace(/\D/g, '')}">${phone}</a></div></div>` : ''}
                ${company ? `<div class="field"><div class="label">🏢 Empresa</div><div class="value">${company}</div></div>` : ''}
                ${service ? `<div class="field"><div class="label">🎯 Servicio de Interés</div><div class="value">${service}</div></div>` : ''}
                <div class="divider"></div>
                <div class="field">
                  <div class="label">💬 Mensaje</div>
                  <div class="message-box">${message}</div>
                </div>
                <div class="cta">
                  <a href="mailto:${email}?subject=Re: Tu consulta - Daniel Caicedo&body=Hola ${encodeURIComponent(name)},%0A%0AGracias por contactarme. Con gusto te ayudo con..." class="btn">
                    ✉️ Responder ahora
                  </a>
                </div>
              </div>
              <div class="footer">
                Lead ID: <span>${lead.id}</span><br>
                Daniel Caicedo — SEO · SEM · AI Automation
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error('Error procesando lead:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Usa el panel de admin en /admin' }, { status: 200 });
}
