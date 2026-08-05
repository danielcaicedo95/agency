import { NextRequest, NextResponse } from 'next/server';
import { getAllPagesSEO, savePageSEO, deletePageSEO, PageSEO } from '@/lib/seo';

export const dynamic = 'force-dynamic';

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-password');
  return authHeader === (process.env.ADMIN_PASSWORD || '30714352');
}

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const pages = getAllPagesSEO();
    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Error fetching admin SEO:', error);
    return NextResponse.json({ error: 'Error al obtener metadatos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body: PageSEO = await request.json();

    if (!body.path || !body.title || !body.description) {
      return NextResponse.json(
        { error: 'Los campos path, title y description son obligatorios' },
        { status: 400 }
      );
    }

    const success = savePageSEO(body);

    if (success) {
      return NextResponse.json({ message: 'Metadatos guardados con éxito', page: body });
    } else {
      return NextResponse.json({ error: 'Error al guardar en el servidor' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error saving page SEO:', error);
    return NextResponse.json({ error: 'Error en el servidor al guardar metadatos' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'El parámetro path es requerido' }, { status: 400 });
    }

    const success = deletePageSEO(path);

    if (success) {
      return NextResponse.json({ message: 'Metadatos restablecidos a automático' });
    } else {
      return NextResponse.json({ error: 'Error al eliminar metadatos personalizados' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting page SEO:', error);
    return NextResponse.json({ error: 'Error en el servidor al eliminar' }, { status: 500 });
  }
}
