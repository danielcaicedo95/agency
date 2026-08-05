import { NextRequest, NextResponse } from 'next/server';
import { getSEOForPath } from '@/lib/seo';

export const dynamic = 'force-dynamic';

// Detect the site origin from the incoming request headers.
// Works on localhost, Vercel previews, and production.
function detectOrigin(request: NextRequest): string {
  // Vercel sets x-forwarded-host and x-forwarded-proto
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  // Fallback to the Host header
  const host = request.headers.get('host');
  if (host) {
    const proto = host.startsWith('localhost') ? 'http' : 'https';
    return `${proto}://${host}`;
  }

  // Last resort: use NEXT_PUBLIC_SITE_URL env var if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  return '';
}

// Resolve a stored path/URL to a full absolute URL using the detected origin
function resolveUrl(value: string | undefined, origin: string): string {
  if (!value) return '';
  if (value.startsWith('http')) return value; // already absolute, leave as-is
  if (value.startsWith('/')) return `${origin}${value}`;
  return value;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const origin = detectOrigin(request);

    const seoData = getSEOForPath(path);

    // Resolve canonical and hreflangs to full URLs using detected origin
    const resolvedData = {
      ...seoData,
      canonicalUrl: resolveUrl(seoData.canonicalUrl, origin),
      hreflangs: seoData.hreflangs.map((hf) => ({
        ...hf,
        url: resolveUrl(hf.url, origin),
      })),
    };

    return NextResponse.json(resolvedData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300',
      },
    });
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO metadata' },
      { status: 500 }
    );
  }
}
