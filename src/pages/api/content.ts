import type { APIRoute } from 'astro';
import {
  updateBio,
  updateStatement,
  saveSeriesItem,
  deleteSeriesItem,
  saveTallerItem,
  deleteTallerItem,
  saveKitItem,
  deleteKitItem,
  updateContactInfo,
} from '@/lib/contentStore';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get('admin_session')?.value;
  if (!session) {
    return new Response(JSON.stringify({ success: false, error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, data } = await request.json();

    switch (type) {
      case 'bio':
        await updateBio(data);
        break;
      case 'statement':
        await updateStatement(data);
        break;
      case 'series':
        await saveSeriesItem(data);
        break;
      case 'talleres':
        await saveTallerItem(data);
        break;
      case 'kits':
        await saveKitItem(data);
        break;
      case 'contact':
        await updateContactInfo(data);
        break;
      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Tipo de contenido no reconocido' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Error guardando contenido' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get('admin_session')?.value;
  if (!session) {
    return new Response(JSON.stringify({ success: false, error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const id = url.searchParams.get('id');

    if (!type || !id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Faltan parámetros tipo o id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    switch (type) {
      case 'series':
        await deleteSeriesItem(id);
        break;
      case 'talleres':
        await deleteTallerItem(id);
        break;
      case 'kits':
        await deleteKitItem(id);
        break;
      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Tipo no eliminable' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Error eliminando recurso' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

