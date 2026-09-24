import type { APIRoute } from 'astro';
import { ContactFormSchema } from '@/lib/schemas/contact.schema';
import { addContactMessage } from '@/lib/contentStore';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const validation = ContactFormSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: validation.error.errors[0]?.message || 'Datos del formulario no válidos',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const messageRecord = await addContactMessage(validation.data);

    return new Response(
      JSON.stringify({ success: true, data: messageRecord }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Error procesando el mensaje de contacto' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

