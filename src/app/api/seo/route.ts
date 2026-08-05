import { NextRequest, NextResponse } from 'next/server';
import { getSEOForPath } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const seoData = getSEOForPath(path);

    return NextResponse.json(seoData, {
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
