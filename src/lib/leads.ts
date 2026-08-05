import fs from 'fs';
import path from 'path';

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
 *   de la función lambda.
 * - En desarrollo usamos /data/leads.json.
 */
export function getLeadsFilePath() {
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

export function saveLead(lead: Lead): void {
  const leads = readLeads();
  leads.unshift(lead);
  saveLeads(leads);
}
