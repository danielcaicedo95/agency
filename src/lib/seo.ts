import fs from 'fs';
import path from 'path';
import { PageSEO, getDefaultSEO, KNOWN_PAGES } from './seo-defaults';

export * from './seo-defaults';

// ─── FILE STORAGE PATHS ──────────────────────────────────────────────────────
function getSEOFilePath(): { primary: string; fallback: string } {
  const primary = path.join(process.cwd(), 'data', 'seo.json');
  const fallback = path.join('/tmp', 'agency-seo.json');
  return { primary, fallback };
}

// ─── READ ALL STORED CUSTOM SEO RECORD ───────────────────────────────────────
export function readCustomSEOStorage(): Record<string, PageSEO> {
  const { primary, fallback } = getSEOFilePath();

  // Try primary
  try {
    if (fs.existsSync(primary)) {
      const raw = fs.readFileSync(primary, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading primary seo.json:', err);
  }

  // Try fallback
  try {
    if (fs.existsSync(fallback)) {
      const raw = fs.readFileSync(fallback, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading fallback seo.json:', err);
  }

  return {};
}

// ─── SAVE STORED CUSTOM SEO RECORD ──────────────────────────────────────────
export function saveCustomSEOStorage(data: Record<string, PageSEO>): boolean {
  const { primary, fallback } = getSEOFilePath();
  const jsonContent = JSON.stringify(data, null, 2);

  // Try primary
  try {
    const dir = path.dirname(primary);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(primary, jsonContent, 'utf-8');
    return true;
  } catch (err) {
    console.warn('Failed to write to primary seo.json, writing to fallback:', err);
  }

  // Try fallback
  try {
    const dir = path.dirname(fallback);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fallback, jsonContent, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write to fallback seo.json:', err);
    return false;
  }
}

// ─── PUBLIC HELPERS ─────────────────────────────────────────────────────────

// Get SEO config for a specific path (custom if available, default otherwise)
export function getSEOForPath(targetPath: string): PageSEO {
  const normalizedPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const customStorage = readCustomSEOStorage();

  if (customStorage[normalizedPath]) {
    return {
      ...customStorage[normalizedPath],
      isCustom: true,
    };
  }

  return getDefaultSEO(normalizedPath);
}

// Get all pages list (known pages + custom paths created by user)
export function getAllPagesSEO(): PageSEO[] {
  const customStorage = readCustomSEOStorage();
  const resultMap: Record<string, PageSEO> = {};

  // Fill known pages defaults
  KNOWN_PAGES.forEach((kp) => {
    resultMap[kp.path] = getDefaultSEO(kp.path);
  });

  // Override or add custom storage entries
  Object.keys(customStorage).forEach((pathKey) => {
    resultMap[pathKey] = {
      ...customStorage[pathKey],
      isCustom: true,
    };
  });

  return Object.values(resultMap);
}

// Save or Update metadata for a page
export function savePageSEO(seo: PageSEO): boolean {
  const normalizedPath = seo.path.startsWith('/') ? seo.path : `/${seo.path}`;
  const storage = readCustomSEOStorage();

  storage[normalizedPath] = {
    ...seo,
    path: normalizedPath,
    isCustom: true,
    updatedAt: new Date().toISOString(),
  };

  return saveCustomSEOStorage(storage);
}

// Delete custom SEO for a path (resetting to default)
export function deletePageSEO(targetPath: string): boolean {
  const normalizedPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const storage = readCustomSEOStorage();

  if (storage[normalizedPath]) {
    delete storage[normalizedPath];
    return saveCustomSEOStorage(storage);
  }

  return true;
}
